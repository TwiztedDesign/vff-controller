import {Component, Host, h, Element, Prop, Watch} from '@stencil/core';

@Component({
  tag: 'vff-image-browser',
  styleUrl: 'image-browser.css',
  shadow: true
})
export class ImageBrowser {
  private previewZone: HTMLElement;

  @Prop({mutable: true}) selectedFiles: File[] = [];

  @Element() el: HTMLElement;

  constructor() {
    this.addFiles = this.addFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.previewFile = this.previewFile.bind(this);
  }

  @Watch('selectedFiles')
  handleFilesChange(newValue) {
    this.previewZone.innerHTML = '';
    if (newValue.length !== 0) {
      this.selectedFiles.forEach(this.previewFile);
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
    // @ts-ignore
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
        // this.previewZone.removeChild(imgContainer);
        this.removeFile(file);
      });

      imgContainer.appendChild(img);
      imgContainer.appendChild(ctrl);
      this.previewZone.appendChild(imgContainer)
    }.bind(this);
  }

  render() {
    const previewInstruction = this.selectedFiles.length === 0 ?
      <label htmlFor="preview__input" id="preview__instructions">
        Drop images here or <span id="click">click</span> to select.
      </label> : null;

    return (
      <Host>
        <div id="search-bar">
          <input type="text"/>
          <button type="button">Select Image</button>
        </div>
        <input onChange={(e) => {
          {/*
          // @ts-ignore */}
          this.addFiles(e.target.files)
        }} id="preview__input" type="file" multiple accept="image/*"/>
        <div id="preview">{previewInstruction}</div>
      </Host>
    );
  }
}
