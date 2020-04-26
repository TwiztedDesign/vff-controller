import {Component, Host, h, Prop, Element, Event, EventEmitter, Listen, Watch} from '@stencil/core';
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";

@Component({
  tag: 'vff-radio-button',
  styleUrl: 'radio-button.css',
  shadow: true
})
export class RadioButton {
  private radioButton: HTMLInputElement;

  @Element() el: HTMLElement;

  @Prop() name = 'radio';
  @Prop() value = 'on';
  @Prop({reflect: true, mutable: true}) checked = false;

  @Event({
    eventName: 'radioButtonStateChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) radioButtonStateChange: EventEmitter;

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
  }) changeChecked: EventEmitter;

  @Watch('checked')
  validateCheckedPropChange(newValue: boolean) {
    this.radioButton.checked = newValue;
    if (newValue) { // If one button is enabled, others should disable themselves. Let's notify them.
      this.radioButtonStateChange.emit({
        origin: this.radioButton,
        name: (this.name || this.el.getAttribute('name')), // When changed from DOM "name" prop will be null.
        data: this.checked
      });
    }
  }

  @Listen('radioButtonStateChange', {target: 'document'})
  handleRadioButtonStateChange(event: CustomEvent) {
    const {origin, name} = event.detail;
    if (origin === this.radioButton) return;
    if (name === this.name) {
      this.checked = false;
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
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.componentInit.emit({
      data: this.value,
      el: this.el
    });
  }

  componentDidLoad() {
    this.radioButton = this.el.shadowRoot.querySelector('input');
    this.radioButton.checked = this.checked; // In case attribute was set in HTML on initial render.
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
  }

  private handleClick() {
    if (!this.checked) {// Radio button can't disable itself.
      this.checked = true;
      this.changeChecked.emit({
        data: this.checked,
        el: this.el
      })
    }
  }

  render() {
    return (
      <Host onClick={this.handleClick}>
        <label class="element-checkbox">
          <input disabled type="radio"/>
          <div class="element-checkbox-indicator"/>
          <div class="element-checkbox-text">
            <slot></slot>
          </div>
        </label>
      </Host>
    );
  }
}
