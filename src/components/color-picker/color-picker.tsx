import {Component, Host, h, Element, Event, EventEmitter, Prop, Watch, Listen} from '@stencil/core';
import Pickr from '@simonwep/pickr';
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";

@Component({
  tag: 'vff-color-picker',
  styleUrl: 'color-picker.css',
  styleUrls: ['../../../node_modules/@simonwep/pickr/dist/themes/nano.min.css'],
  shadow: true
})
export class ColorPicker {
  private _pickerPromise;
  private _pickerResolve;

  @Event({
    eventName: 'vff:init',
    bubbles: true,
    cancelable: true,
    composed: true
  }) componentInit: EventEmitter;

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
    this._pickerPromise.then((instance) => {
      instance.setColor(newValue);
    })
  }

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.value = value;
    }
  }

  constructor() {
    this._pickerPromise = new Promise(resolve => {
      this._pickerResolve = resolve;
    })
  }

  connectedCallback() {
    this.componentInit.emit({
      data: this.value,
      el: this.el
    });
  }

  componentDidLoad() {
    // initialize 3d party color picker component
    Pickr.create({
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
    }).on('init', instance => {
      this._pickerResolve(instance);
    }).on('change', (color) => {
      const colorStr: string = color.toHEXA().toString();
      if (this.value !== colorStr) { // this prevents event firing when setColor function is triggered
        this.value = colorStr;
        this.changeColorProperty.emit({
          data: colorStr,
          el: this.el
        });
      }
    });
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
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
