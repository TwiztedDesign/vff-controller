import {Component, Host, h, Element, Prop, Watch, State} from '@stencil/core';
import {readFileAsync} from "../../utils/utils";

@Component({
  tag: 'vff-image-browser',
  styleUrl: 'image-browser.css',
  shadow: true
})
export class ImageBrowser {
  private previewZone: HTMLElement;
  private inputFile: HTMLInputElement;
  private numOfFilesLimit = 1;

  @State() previewList = [];
  @State() isNumOfFilesLimitError: boolean = false;

  @Prop({mutable: true}) selectedFiles: File[] = [];

  @Element() el: HTMLElement;

  constructor() {
    this.addFiles = this.addFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  @Watch('isNumOfFilesLimitError')
  handleNumOfFilesLimitError(newValue) {
    if (newValue) {
      setTimeout(() => {
        this.isNumOfFilesLimitError = false;
      }, 5000)
    }
  }

  @Watch('selectedFiles')
  handleFilesChange(newValue) {
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

  addFiles(files) {
    if (files.length === 0) return;
    if ((files.length + this.selectedFiles.length) > this.numOfFilesLimit) {
      this.isNumOfFilesLimitError = true;
      return;
    }
    this.selectedFiles = [...this.selectedFiles, ...files];
    this.inputFile.value = ''; // if not reset, it will prevent to cancel and upload the same file
  }

  removeFile(file) {
    if (!file) return;
    this.selectedFiles = this.selectedFiles.filter(lf => lf !== file);
  }

  render() {
    let content = null;

    if (this.selectedFiles.length === 0) {
      content = <label htmlFor="preview__input" id="preview__instructions">
        Drop images here or <span id="click">click</span> to select.
      </label>;
    } else if (this.previewList.length > 0) {
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

    let errorMsg = null;

    if (this.isNumOfFilesLimitError) {
      errorMsg = <div id="error-msg" onClick={() => this.isNumOfFilesLimitError = false}>
        Allowed number of files to select is {this.numOfFilesLimit}
      </div>
    }

    return (
      <Host>
        <div id="preview">
          <input id="preview__input" type="file" accept="image/*"
                 onChange={(e) => {
                   const target = e.target as HTMLInputElement;
                   this.addFiles(target.files)
                 }}/>
          {content}
          {errorMsg}
        </div>
      </Host>
    )
  }
}
