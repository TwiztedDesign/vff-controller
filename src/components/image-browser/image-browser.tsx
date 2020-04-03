import {Component, Host, h, Element} from '@stencil/core';

@Component({
  tag: 'vff-image-browser',
  styleUrl: 'image-browser.css',
  shadow: true
})
export class ImageBrowser {
  private previewZone: HTMLElement;

  @Element() el: HTMLElement;

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
      let dt = e.dataTransfer;
      let files = dt.files;
      // @ts-ignore
      ([...files]).forEach((file) => {
        this.previewFile(file);
        /*let url = 'YOUR URL HERE';
        let formData = new FormData();

        formData.append('file', file);

        fetch(url, { method: 'POST', body: formData })
          .then(() => {
          })
          .catch(() => {
          });*/
      })
    }, false);
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
        this.previewZone.removeChild(imgContainer);
      });

      imgContainer.appendChild(img);
      imgContainer.appendChild(ctrl);
      this.previewZone.appendChild(imgContainer)
    }.bind(this);
  }

  render() {
    return (
      <Host>
        <div id="search-bar">
          <input type="text"/>
          <button type="button">Select Image</button>
        </div>
        <div id="preview">
          <span id="preview__instructions">Drop images here or click to upload.</span>
        </div>
      </Host>
    );
  }
}
