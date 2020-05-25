import {Component, Host, h, Event, EventEmitter, Element, Listen, Prop, Watch} from '@stencil/core';
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";
import {secToTimeString} from '../../utils/utils';
import {vff} from '../../utils/vff.utils';

/**
 * @example
 * <vff-video-time></vff-video-time>
 */
@Component({
  tag: 'vff-video-time',
  styleUrl: 'video-time.css',
  shadow: true
})
export class VideoTime {
  /** Sets or returns the value in seconds. */
  @Prop() value: number = 0;

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

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.value = value;
    }
  }

  @Watch('value')
  validateValue(newValue) {
    if (!parseFloat(newValue)) {
      this.value = 0;
      console.error('vff-video-time value must be an integer');
    } else {
      this.value = parseFloat(newValue);
    }
  }

  constructor() {
    this.getTime = this.getTime.bind(this);
    this.goToTime = this.goToTime.bind(this);
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

  private getTime() {
    vff.controller.currentTime().then(time => {
      if (time !== undefined && time !== this.value) {
        this.value = time;
        this.changeValue.emit({
          data: this.value,
          el: this.el
        })
      }
    });
  }

  private goToTime() {
    vff.controller.go(this.value);
  }

  render() {
    return (
      <Host>
        <div class="timepicker">
          <input class="timepicker-time-value" type="text" readonly/>
          <span class="timepicker-time-display">{secToTimeString(this.value)}</span>
          <a class="timepicker-button" onClick={this.getTime}>Set</a>
          <a class="timepicker-button" onClick={this.goToTime}>Go</a>
        </div>
      </Host>
    );
  }
}
