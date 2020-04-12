import {Component, Host, h, Element, Watch, State, Method, Event, EventEmitter} from '@stencil/core';
import {readFileAsync} from "../../utils/utils";

@Component({
  tag: 'vff-image-browser',
  styleUrl: 'image-browser.css',
  shadow: true
})
export class ImageBrowser {
  private allowedFileTypes = [
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/svg',
  ];
  private numOfFilesLimit = 1;
  private previewZone: HTMLElement;
  private inputFile: HTMLInputElement;

  @State() previewList = [];
  @State() error: string = '';
  @State() selectedFiles: File[] = [];

  @Element() el: HTMLElement;

  constructor() {
    this.addFiles = this.addFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  @Event({
    eventName: 'change',
    bubbles: true,
    cancelable: true,
    composed: true
  }) changeSelectedFiles: EventEmitter;

  @Watch('error')
  handleFileTypeError(newValue: string) {
    if (newValue.length > 0) {
      setTimeout(() => {
        this.error = '';
      }, 10000)
    }
  }

  @Watch('selectedFiles')
  handleFilesChange(newValue) {
    this.changeSelectedFiles.emit({
      data: newValue
    });

    if (newValue.length > 0) {
      const promises = this.selectedFiles.map(async file => {
        const data = await readFileAsync(file);
        return {file, data}
      });
      Promise.all(promises).then((data) => {
        this.previewList = data;
      });
    } else if (newValue.length === 0) {
      this.previewList = [];
    }
  }

  componentDidLoad() {
    this.inputFile = this.el.shadowRoot.querySelector('#preview__input');
    this.previewZone = this.el.shadowRoot.querySelector('#preview');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.previewZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      this.previewZone.addEventListener(eventName, () => {
        this.previewZone.classList.add('highlight');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.previewZone.addEventListener(eventName, () => {
        this.previewZone.classList.remove('highlight')
      }, false);
    });

    this.previewZone.addEventListener('drop', (e) => {
      this.addFiles(e.dataTransfer.files);
    }, false);
  }

  @Method()
  async addFiles(files) {
    if (files.length === 0) return;
    // make sure amount of files is not over the allowed limit
    if ((files.length + this.selectedFiles.length) > this.numOfFilesLimit) {
      this.error = `Allowed number of files for selection is: ${this.numOfFilesLimit}`;
      return;
    }
    // make sure that passed file(s) type match the allowed file type setting
    if ([...files].find((file) => this.allowedFileTypes.indexOf(file.type) === -1)) {
      this.error = `Only the following file types allowed: ${this.allowedFileTypes}`;
      return;
    }

    this.selectedFiles = [...this.selectedFiles, ...files];
    this.inputFile.value = ''; // without reset, it will fail to cancel and upload the same file with button option
  }

  @Method()
  async getSelectedFiles() {
    return this.selectedFiles;
  }

  private removeFile(file) {
    if (!file) return;
    this.selectedFiles = this.selectedFiles.filter(lf => lf !== file);
  }

  render() {
    let content = null;

    if (this.selectedFiles.length === 0) { // no files to preview
      content = <label htmlFor="preview__input" id="preview__instructions">
        Drop images here or <span id="click">click</span> to select.
      </label>;
    } else if (this.previewList.length > 0) { // now there are files to preview
      content = this.previewList.map((plObj) => {
        const {file, data} = plObj;
        return (
          <div class="img-container">
            <img src={data}/>
            <div class="img-ctrl">
              <span class="img-ctrl__cancel" onClick={() => this.removeFile(file)}>&#10005;</span>
            </div>
          </div>
        );
      })
    }

    return (
      <Host>
        <div id="preview">
          {/*
          // @ts-ignore*/}
          <input id="preview__input" type="file" accept={...this.allowedFileTypes}
                 onChange={(e) => {
                   const target = e.target as HTMLInputElement;
                   this.addFiles(target.files)
                 }}/>
          {content}
          <div class={this.error ? 'active' : null} id="error-msg" onClick={() => this.error = ''}>
            <span id="error__msg-text">{this.error}</span>
            <span id="error__close-btn">&#10005;</span>
          </div>
        </div>
      </Host>
    )
  }
}
