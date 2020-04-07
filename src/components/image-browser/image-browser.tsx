import {Component, Host, h, Element, Prop, Watch, State} from '@stencil/core';
import {getImage, readFileAsync} from "../../utils/utils";

@Component({
  tag: 'vff-image-browser',
  styleUrl: 'image-browser.css',
  shadow: true
})
export class ImageBrowser {
  private previewZone: HTMLElement;

  @State() searchBarInputValue = '';
  @State() previewList = [];
  @State() isFetchError: boolean = false;
  @State() isFetchingFile: boolean = false;

  @Prop({mutable: true}) selectedFiles: File[] = [];

  @Element() el: HTMLElement;

  constructor() {
    this.addFiles = this.addFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
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

  @Watch('isFetchError')
  handleErrorStateChange(newValue: boolean) {
    if (newValue) {
      setTimeout(() => {
        this.isFetchError = false;
      }, 5000)
    }
  }

  componentDidLoad() {
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
      this.addFiles(e.dataTransfer.files)
    }, false);
  }

  addFiles(files) {
    if (files.length === 0) return;
    this.selectedFiles = [...this.selectedFiles, ...files];
  }

  removeFile(file) {
    if (!file) return;
    this.selectedFiles = this.selectedFiles.filter(lf => lf !== file);
  }

  renderSearchBar() {
    const disabled = this.isFetchingFile;

    return (
      <div id="search-bar">
        <input placeholder="place url to grab an image ..." id="search-bar__input" type="url"
               disabled={disabled}
               value={this.searchBarInputValue}
               onChange={(e) => {
                 this.searchBarInputValue = (e.target as HTMLInputElement).value;
               }}
               onKeyUp={(e) => {
                 if (e.code === 'Enter') {
                   (this.el.shadowRoot.querySelector('#search-bar__btn') as HTMLElement).click();
                 }
               }}/>
        <button id="search-bar__btn" type="button"
                disabled={disabled}
                onClick={() => {
                  const value = encodeURI(this.searchBarInputValue.trim());
                  if (!value) return;
                  this.isFetchingFile = true;
                  getImage(value)
                    .then((file) => {
                      this.searchBarInputValue = '';
                      this.addFiles([new File([file], `image-${Date.now()}`, {})]);
                    })
                    .catch(() => {
                      this.isFetchError = true;
                    })
                    .finally(() => {
                      this.isFetchingFile = false;
                    });
                }}>
          Select Image
        </button>
      </div>
    );
  }

  renderDropZone() {
    let content = null;

    if (this.isFetchingFile) {
      content = <div id="loader">Loading</div>;
    } else if (this.selectedFiles.length === 0) {
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

    return (
      <div id="preview">
        <input id="preview__input" type="file" multiple accept="image/*"
               onChange={(e) => {
                 const target = e.target as HTMLInputElement;
                 this.addFiles(target.files)
               }}/>
        {content}
      </div>
    )
  }

  render() {
    return (
      <Host>
        {this.renderSearchBar()}
        {this.renderDropZone()}
        {
          this.isFetchError ?
            <div id="error-msg" onClick={() => this.isFetchError = false}>
              There was an error getting your image, check the console to see more information.
            </div> : null
        }
      </Host>
    );
  }
}
