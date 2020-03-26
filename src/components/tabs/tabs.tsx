import {Component, Host, h, Listen, Element, Prop, Event, EventEmitter} from '@stencil/core';

@Component({
  tag: 'vff-tabs',
  styleUrl: 'tabs.css',
  shadow: true
})
export class Tabs {
  /** default tab to be selected on tabs load when not selected first will be selected */
  @Prop() default;
  @Element() el: HTMLElement;
  @Event({
    eventName: 'tab:active', composed: true, cancelable: true, bubbles: true,
  }) tabActive: EventEmitter;

  connectedCallback() {
    const tabs = this.el.children;
    let tab;
    if (!this.default) {
      this.activate(tabs[0]);
    } else {
      for (let i = 0, j = tabs.length; i < j; i++) {
        const child = this.el.children[i];
        if (child.getAttribute('for') === this.default) {
          tab = child;
          break;
        }
      }
      if (tab) {
        this.activate(tab);
      } else {
        this.activate(tabs[0]); // in case of misspelling
      }
    }
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
    this.tabActive.emit(tab.getAttribute('for'));
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
