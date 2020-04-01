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
  @Prop({reflect: true, mutable: true}) checked = false;

  @Watch('checked')
  validateChecked(newValue: boolean) {
    this.radioButton.checked = newValue;
    if (newValue) {
      this.radioButtonStateChange.emit({
        origin: this.radioButton,
        name: this.name,
        checked: this.checked
      });
    }
  }

  @Event({
    eventName: 'radioButtonStateChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) radioButtonStateChange: EventEmitter;

  @Listen('radioButtonStateChange', {target: 'document'})
  handleRadioButtonClicked(event: CustomEvent) {
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
    this.radioButton.checked = this.checked;
  }

  handleClick() {
    !this.checked && (this.checked = true); // radio button can't disable it'self
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
