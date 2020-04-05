import {Component, Host, h, Element, Prop, Watch, State} from '@stencil/core';
import {getImage} from "../../utils/utils";

@Component({
  tag: 'vff-image-browser',
  styleUrl: 'image-browser.css',
  shadow: true
})
export class ImageBrowser {
  private previewZone: HTMLElement;
  private searchBarInput: HTMLInputElement;

  @Prop({mutable: true}) selectedFiles: File[] = [];
  @State() isError: boolean = false;
  @State() isFetchingFile: boolean = false;

  @Element() el: HTMLElement;

  constructor() {
    this.addFiles = this.addFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.previewFile = this.previewFile.bind(this);
  }

  @Watch('selectedFiles')
  handleFilesChange(newValue) {
    this.previewZone.innerHTML = '';
    this.searchBarInput.value = '';
    if (newValue.length !== 0) {
      this.selectedFiles.forEach(this.previewFile);
    }
  }

  @Watch('isError')
  handleErrorStateChange(newValue: boolean) {
    if (newValue) {
      setTimeout(() => {
        this.isError = false;
      }, 5000)
    }
  }

  componentDidLoad() {
    this.searchBarInput = this.el.shadowRoot.querySelector('#search-bar__input');
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

  previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const img = document.createElement('img');
      // @ts-ignore
      img.src = reader.result;

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');

      const ctrl = document.createElement('div');
      ctrl.classList.add('img-ctrl');

      const cancel = document.createElement('span');
      cancel.classList.add('img-ctrl__cancel');
      cancel.innerHTML = '&#10005;';
      ctrl.appendChild(cancel);
      cancel.addEventListener('click', () => {
        this.removeFile(file);
      });

      imgContainer.appendChild(img);
      imgContainer.appendChild(ctrl);
      this.previewZone.appendChild(imgContainer)
    }.bind(this);
  }

  renderSearchBar() {
    const disabled = this.isFetchingFile;

    return (
      <div id="search-bar">
        <input placeholder="place url to grab an image ..." id="search-bar__input" type="url"
               disabled={disabled}
               onKeyUp={(e) => {
                 if (e.code === 'Enter') {
                   (this.el.shadowRoot.querySelector('#search-bar__btn') as HTMLElement).click();
                 }
               }}/>
        <button id="search-bar__btn" type="button"
                disabled={disabled}
                onClick={() => {
                  const value = this.searchBarInput.value;
                  if (!value) return;
                  this.isFetchingFile = true;
                  getImage(value)
                    .then((file) => {
                      if (!file) return Promise.reject();
                      this.addFiles(
                        [new File([file], `image-${Date.now()}`, {})]
                      );
                    })
                    .catch(() => {
                      this.isError = true;
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
    const previewInstruction = !this.isFetchingFile && this.selectedFiles.length === 0 ?
      <label htmlFor="preview__input" id="preview__instructions">
        Drop images here or <span id="click">click</span> to select.
      </label> : null;

    const loader = this.isFetchingFile ?
      <div id="loader">Loading</div> : null;

    return (
      <div id="preview">
        {loader}
        <input id="preview__input" type="file" multiple accept="image/*"
               onChange={(e) => {
                 const target = e.target as HTMLInputElement;
                 this.addFiles(target.files)
               }}/>
        {previewInstruction}
      </div>
    )
  }

  render() {
    return (
      <Host>
        {this.renderSearchBar()}
        {this.renderDropZone()}
        {
          this.isError ?
            <div id="error-msg" onClick={() => this.isError = false}>
              There was an error getting your image, check the console to see more information.
            </div> : null
        }
      </Host>
    );
  }
}
