import {Component, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'vff-tab',
  styleUrl: 'tab.css',
  shadow: true,
})
export class Tab {
  /** Refers to the id of the element this tab is associated with. */
  @Prop() for;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
