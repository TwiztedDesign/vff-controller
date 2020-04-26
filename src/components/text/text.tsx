import {Component, Host, h, Prop, Event, EventEmitter, Listen} from '@stencil/core';

@Component({
  tag: 'vff-text',
  styleUrl: 'text.css',
  shadow: true
})
export class Text {
  @Prop() placeholder: string = '';
  @Prop() value: string = '';
  @Prop() multiline: boolean = false;
  @Prop() vffData = '';

  @Event({
    eventName: 'vff:rendered',
    bubbles: true,
    cancelable: true,
    composed: true
  }) componentRendered: EventEmitter;

  @Event({
    eventName: 'vff:change',
    bubbles: true,
    cancelable: true,
    composed: true
  }) changeValue: EventEmitter;

  constructor() {
    this.onValueChange = this.onValueChange.bind(this);
  }

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {vffData, value} = newValue.detail;
    if (vffData !== this.vffData) return;
    this.value = value;
  }

  private onValueChange(e) {
    this.value = e.target.value;
    this.changeValue.emit({data: this.value});
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

  componentDidRender() {
    this.componentRendered.emit({data: this.value});
  }

  render() {
    return (<Host>
      {this.multiline ? this.renderMultiLine() : this.renderSingleLine()}
    </Host>)
  }
}

