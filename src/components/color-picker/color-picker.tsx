import {Component, Host, h, Element, Event, EventEmitter, Prop, Watch} from '@stencil/core';
import Pickr from '@simonwep/pickr';

@Component({
  tag: 'vff-color-picker',
  styleUrl: 'color-picker.css',
  styleUrls: ['../../../node_modules/@simonwep/pickr/dist/themes/nano.min.css'],
  shadow: true
})
export class ColorPicker {
  private colorPicker: Pickr;

  @Event({
    eventName: 'vff:change',
    bubbles: true,
    cancelable: true,
    composed: true
  }) changeColorProperty: EventEmitter;

  @Prop({mutable: true}) value: string;

  @Element() el: HTMLElement;

  @Watch('value')
  handleValuePropChange(newValue) {
    this.colorPicker.setColor(newValue);
  }

  componentDidLoad() {
    // initialize 3d party color picker component
    this.colorPicker = Pickr.create({
      el: this.el.shadowRoot.querySelector('#color-picker__btn') as HTMLElement,
      theme: 'nano', // or 'monolith', or 'nano'
      container: this.el.shadowRoot.querySelector('#color-picker__app-container') as HTMLElement,

      swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
      ],

      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true
        }
      }
    });

    // attach events
    this.colorPicker
      .on('change', (color) => {
        const clrStr = color.toHEXA().toString();
        if (this.value !== clrStr) { // this prevents event firing when setColor function is triggered
          this.changeColorProperty.emit({
            data: clrStr
          });
          this.value = clrStr;
        }
      })
  }

  render() {
    return (
      <Host>
        <div id="color-picker__app-container"/>
        <div id="color-picker__btn"/>
      </Host>
    );
  }
}
