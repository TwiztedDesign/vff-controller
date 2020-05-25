import {Component, Host, h, Prop, Event, EventEmitter, Listen, Element} from '@stencil/core';
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";

/**
 * @example
 * <vff-text></vff-text>
 */
@Component({
  tag: 'vff-text',
  styleUrl: 'text.css',
  shadow: true
})
export class Text {
  /** Specifies a short hint that describes the expected value of a text area */
  @Prop() placeholder: string = '';
  /** Sets or returns the contents of a text area */
  @Prop() value: string = '';
  /** Defines a multi-line text input control */
  @Prop() multiline: boolean = false;

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

  constructor() {
    this.onValueChange = this.onValueChange.bind(this);
  }

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.value = value;
    }
  }

  connectedCallback() {
    this.componentInit.emit({
      data: this.value,
      el: this.el
    });
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
  }

  private onValueChange(e) {
    this.value = e.target.value;
    this.changeValue.emit({data: this.value, el: this.el});
  }

  private renderSingleLine() {
    return <input placeholder={this.placeholder}
                  onInput={this.onValueChange}
                  type="text"
                  value={this.value}/>;
  }

  private renderMultiLine() {
    return <textarea placeholder={this.placeholder}
                     onInput={this.onValueChange}
                     value={this.value}/>;
  }

  render() {
    return (<Host>
      {this.multiline ? this.renderMultiLine() : this.renderSingleLine()}
    </Host>)
  }
}

