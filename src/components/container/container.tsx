import {Component, Host, h, Listen, Element} from '@stencil/core';

@Component({
  tag: 'vff-container',
  styleUrl: 'container.css',
  shadow: true
})
/** Top most container in DOM for vff elements */
export class Container {
  private activeSection: Element = null;
  @Element() el: HTMLElement;

  /** Handle Tab events */
  @Listen('tab:active')
  handleTabActive(e: CustomEvent) {
    const section = this.el.querySelector(`#${e.detail}`);
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
