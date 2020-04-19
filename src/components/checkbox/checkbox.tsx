import {Component, Host, h, Prop, Watch, Element, Event, EventEmitter} from '@stencil/core';

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
    eventName: 'vff:change',
    bubbles: true,
    cancelable: true,
    composed: true
  }) changeChecked: EventEmitter;

  @Watch('value')
  validateCheckedPropChange(newValue: boolean) {
    this.checkBoxInput.checked = newValue;
    this.changeChecked.emit({
      data: newValue
    });
  }

  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidLoad() {
    this.checkBoxInput = this.el.shadowRoot.querySelector('input');
    this.checkBoxInput.checked = this.value;
  }

  handleClick() {
    this.value = !this.value;
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
