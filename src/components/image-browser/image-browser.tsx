import {Component, Host, h, Element, Watch, State, Method, Event, EventEmitter, Prop, Listen} from '@stencil/core';
import {readFileAsync} from "../../utils/utils";
import {PreviewItem} from "../../interface/interface";
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";

@Component({
  tag: 'vff-image-browser',
  styleUrl: 'image-browser.css',
  shadow: true
})
export class ImageBrowser {
  private allowedFileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    'image/jpg',
    "image/png",
    "image/svg",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
  ];
  private numOfFilesLimit = 1;
  private previewZone: HTMLElement;
  private inputFile: HTMLInputElement;

  @State() previewList: PreviewItem[] = [];

  @Prop({mutable: true}) error: string = '';
  @Prop({mutable: true}) selectedFiles: File[] = [];
  @Prop() progress: boolean = false;
  @Prop() progressStatus: number = 0;
  @Prop({reflect: true, mutable: true}) value: string = '';

  @Element() el: HTMLElement;

  @Event({
    eventName: 'vff:change',
    bubbles: true,
    cancelable: true,
    composed: true
  }) changeSelectedFiles: EventEmitter;

  @Event({
    eventName: 'vff:init',
    bubbles: true,
    cancelable: true,
    composed: true
  }) componentInit: EventEmitter;

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.value = value;
    }
  }

  @Watch('value') // it is used when ever the image just need to be previewed and not to go to selectedFiles
  handleValueChangeProp(newValue) {
    if (!newValue) {
      this.selectedFiles = [];
      return;
    }
    this.selectedFiles.length = 0; // don't want to trigger Watchers and events
    this.previewList = [];
    this.previewList = [{file: new File([], 'placeholder'), data: newValue}];
  }

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
      data: newValue,
      el: this.el
    });

    if (newValue.length > 0) {
      const promises = this.selectedFiles.map(async file => {
        const data = await readFileAsync(file);
        return {file, data}
      });
      Promise.all(promises).then((files) => {
        this.previewList = files;
      });
    } else if (newValue.length === 0) {
      this.previewList = [];
    }
  }

  constructor() {
    this.addFiles = this.addFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  connectedCallback() {
    this.componentInit.emit({
      data: this.value,
      el: this.el
    });
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

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
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

  private removeFile(file) {
    if (!file) return;
    this.value = '';
    this.selectedFiles = this.selectedFiles.filter(lf => lf !== file);
  }

  render() {
    let content = null;

    if (this.progress) {
      content = <vff-progress-bar status={this.progressStatus}/>;
    } else if (this.selectedFiles.length === 0) { // no files to preview
      content = <label htmlFor="preview__input" id="preview__instructions">
        Drop images here or <span id="click">click</span> to select.
      </label>;
    }
    // previewList can be independent from selectedFiles in case of files that are set with value Prop
    if (this.previewList.length > 0) { // now there are files to preview
      content = this.previewList.map((plObj) => {
        const {file, data} = plObj;
        return (
          <div class="img-container">
            <img src={data as string}/>
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
