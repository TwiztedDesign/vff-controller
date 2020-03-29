import {Component, Host, h} from '@stencil/core';

@Component({
  tag: 'vff-section',
  styleUrl: 'section.css',
  shadow: true
})
export class Section {

  render() {
    return (
      <Host>
        <div class='ctrl-container'>
          <slot></slot>
        </div>
      </Host>
    );
  }

}
