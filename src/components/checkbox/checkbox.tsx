import {Component, Host, h, Prop, Watch, Element, Event, EventEmitter, Listen} from '@stencil/core';
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";

@Component({
  tag: 'vff-checkbox',
  styleUrl: 'checkbox.css',
  shadow: true
})
export class Checkbox {
  private checkBoxInput: HTMLInputElement;

  @Prop({attribute: 'checked', reflect: true, mutable: true}) value: boolean = false;

  @Element() el: HTMLElement;

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

  @Watch('value')
  validateCheckedPropChange(newValue: boolean) {
    this.checkBoxInput.checked = newValue;
  }

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.value = value;
    }
  }

  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.componentInit.emit({
      data: this.value,
      el: this.el
    });
  }

  componentDidLoad() {
    this.checkBoxInput = this.el.shadowRoot.querySelector('input');
    this.checkBoxInput.checked = this.value;
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
  }

  private handleClick() {
    this.value = !this.value;
    this.changeValue.emit({
      data: this.value,
      el: this.el
    });
  }

  render() {
    return (
      <Host onClick={this.handleClick}>
        <label class="element-checkbox">
          <input disabled type="checkbox"/>
          <div class="element-checkbox-indicator"/>
          <div class="element-checkbox-text">
            <slot/>
          </div>
        </label>
      </Host>
    );
  }
}
