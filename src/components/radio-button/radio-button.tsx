import {Component, Host, h, Prop, Element, Event, EventEmitter, Listen, Watch} from '@stencil/core';

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
  @Prop({reflect: true, mutable: true}) checked: boolean = false;

  @Event({
    eventName: 'radioButtonStateChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) radioButtonStateChange: EventEmitter;

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
        checked: this.checked
      });
    }
    this.changeChecked.emit({
      data: this.radioButton.checked
    })
  }

  @Listen('radioButtonStateChange', {target: 'document'})
  handleRadioButtonStateChange(event: CustomEvent) {
    const {origin, name} = event.detail;
    if (origin === this.radioButton) return;
    if (name === this.name) {
      this.checked = false;
    }
  }

  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidLoad() {
    this.radioButton = this.el.shadowRoot.querySelector('input');
    this.radioButton.checked = this.checked; // In case attribute was set in HTML on initial render.
  }

  handleClick() {
    !this.checked && (this.checked = true); // Radio button can't disable itself.
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
