import {Component, Host, h, Prop, Event, EventEmitter, Element, Listen, Watch} from '@stencil/core';
import {isValidAttribute, triggerRemoveEvent} from '../../utils/template.utils';

@Component({
  tag: 'vff-range',
  styleUrl: 'range.css',
  shadow: true
})
export class Range {
  @Prop() min: number = 0;
  @Prop() max: number = 100;
  @Prop() value: number = this.max / 2;

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
  }) changeValue: EventEmitter;

  @Element() el: HTMLElement;

  @Watch('value')
  validateValue(newValue) {
    const errorText = 'Value is out of reach, check min and max settings';
    if (newValue > this.max) {
      console.error(errorText);
      this.value = this.max;
    } else if (newValue < this.min) {
      console.error(errorText);
      this.value = this.min;
    }
  }

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.value = value;
    }
  }

  constructor() {
    this.onValueInput = this.onValueInput.bind(this);
  }

  connectedCallback() {
    this.componentInit.emit({data: this.value});
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
  }

  private onValueInput(e) {
    this.value = e.target.value;
    this.changeValue.emit({data: this.value});
  }

  render() {
    return (
      <Host>
        <input type="range"
               min={this.min}
               max={this.max}
               value={this.value}
               onInput={this.onValueInput}
        />
      </Host>
    );
  }
}
