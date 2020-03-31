import {Component, Host, h, Listen, Element, Prop, Event, EventEmitter} from '@stencil/core';

@Component({
  tag: 'vff-tabs',
  styleUrl: 'tabs.css',
  shadow: true
})
export class Tabs {
  private activeSection: Element = null;
  /** Default tab to be selected when tabs component loads. When property is not provided, default will be the most first tab */
  @Prop() default;
  @Element() el: HTMLElement;
  @Event({
    eventName: 'tab:active', composed: true, cancelable: true, bubbles: true,
  }) tabActive: EventEmitter;

  connectedCallback() {
    const tabs = this.el.children;
    this.activate(!this.default ?
      tabs[0] :
      Array.from(tabs)
        .find((tab) => tab.getAttribute('for') === this.default) || tabs[0]);
  }

  @Listen('click')
  handleTabClick(e) {
    Array.prototype.forEach.call(this.el.children, (tab) => {
      tab.classList.remove('active')
    });
    this.activate(e.target);
  }

  activate(tab: Element) {
    tab.classList.add('active');
    const section = document.body.querySelector(`#${tab.getAttribute('for')}`);
    if (this.activeSection) {
      this.activeSection.classList.remove('active');
    }
    if (section) {
      section.classList.add('active');
      this.activeSection = section;
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
