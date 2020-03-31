import {Component, Host, h, Listen, Element, Prop} from '@stencil/core';

@Component({
  tag: 'vff-tabs',
  styleUrl: 'tabs.css',
  shadow: true
})
export class Tabs {
  private tabs;
  private activeSection: Element = null;
  /** Default tab to be selected when tabs component loads.
   *  When property is not provided, default will be the most first tab */
  @Prop() default: string = '';
  @Element() el: HTMLElement;

  connectedCallback() {
    this.tabs = Array.from(this.el.children).filter(ch => ch.nodeName === 'VFF-TAB');
    if (this.tabs.length > 0) {
      this.activate(!this.default ?
        this.tabs[0] :
        this.tabs.find((tab) => tab.getAttribute('for') === this.default) || this.tabs[0]);
    }
  }

  @Listen('click')
  handleTabClick(e) {
    this.tabs.forEach((tab) => {
      tab.classList.remove('active')
    });
    this.activate(e.target);
  }

  activate(tab: Element) {
    tab.classList.add('active');
    const section = document.body.querySelector(`#${tab.getAttribute('for')}`);
    if (section) {
      this.activeSection && this.activeSection.classList.remove('active');
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
