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

  @Prop({mutable: true}) value: string = '#FFFFFF';

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
      default: this.value,
      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction: {
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
      });
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
