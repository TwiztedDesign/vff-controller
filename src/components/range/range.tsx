import {Component, Host, h, Prop, Event, EventEmitter, Element, Listen, Watch} from '@stencil/core';
import {isValidAttribute, triggerRemoveEvent} from '../../utils/template.utils';

/**
 * @example
 * <vff-range></vff-range>
 */
@Component({
  tag: 'vff-range',
  styleUrl: 'range.css',
  shadow: true
})
export class Range {
  /** Sets or returns the number of intervals of a slider control. */
  @Prop() step: number = 1;
  /** Sets or returns the minimum value allowed. */
  @Prop() min: number = 0;
  /** Sets or returns the maximum value allowed. */
  @Prop() max: number = 100;
  /** Sets or returns the value of a slider control. */
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
  handleValuePropChange(newValue) {
    this.validateValue(newValue);
  }

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.value = value;
    }
  }

  constructor() {
    this.validateValue = this.validateValue.bind(this);
    this.onValueInput = this.onValueInput.bind(this);
  }

  connectedCallback() {
    this.validateValue(this.value);
    this.componentInit.emit({
      data: this.value,
      el: this.el
    });
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
  }

  private validateValue(newValue) {
    const errorText = 'Value %d is out of reach, check min and max settings: ';
    if (Number.isNaN(newValue)) {
      this.value = this.max / 2;
      console.error(`passed value is NaN setting to average: `, this.el);
    }
    if (newValue > this.max) {
      console.error(errorText, this.value, this.el);
      this.value = this.max;
    } else if (newValue < this.min) {
      console.error(errorText, this.value, this.el);
      this.value = this.min;
    }
  }

  private onValueInput(e) {
    this.value = e.target.value;
    this.changeValue.emit({
      data: this.value,
      el: this.el
    });
  }

  render() {
    return (
      <Host>
        <input type="range"
               step={this.step}
               min={this.min}
               max={this.max}
               value={this.value}
               onInput={this.onValueInput}
        />
      </Host>
    );
  }
}
