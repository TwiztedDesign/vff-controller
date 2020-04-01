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
      this.radioButtonClick.emit({
        origin: this.radioButton,
        name: this.name,
        checked: this.radioButton.checked
      });
    }
  }

  @Event({
    eventName: 'radioButton:click',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) radioButtonClick: EventEmitter;

  @Listen('radioButton:click', {target: 'document'})
  handleRadioButtonClicked(event: CustomEvent) {
    const {origin, name} = event.detail;
    if (origin === this.radioButton) return;
    if (name === this.name) {
      this.radioButton.checked = false;
      this.checked = false;
    }
  }

  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateChecked = this.validateChecked.bind(this);
  }

  componentDidLoad() {
    this.radioButton = this.el.shadowRoot.querySelector('input');
    this.radioButton.checked = this.checked;
  }

  handleClick() {
    this.radioButtonClick.emit({
      origin: this.radioButton,
      name: this.name,
      checked: this.radioButton.checked
    });
  }

  handleChange() {
    this.checked = this.radioButton.checked;
  }

  render() {
    return (
      <Host>
        <label class="element-checkbox">
          <input onChange={this.handleChange} onClick={this.handleClick} type="radio"/>
          <div class="element-checkbox-indicator"/>
          <div class="element-checkbox-text">
            <slot></slot>
          </div>
        </label>
      </Host>
    );
  }
}
