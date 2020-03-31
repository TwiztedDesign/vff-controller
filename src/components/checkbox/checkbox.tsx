import {Component, Host, h} from '@stencil/core';

@Component({
  tag: 'vff-checkbox',
  styleUrl: 'checkbox.css',
  shadow: true
})
export class Checkbox {
  render() {
    return (
      <Host>
        <label class="element-checkbox">
          <input type="checkbox"/>
          <div class="element-checkbox-indicator"/>
          <div class="element-checkbox-text">
            <slot/>
          </div>
        </label>
      </Host>
    );
  }

}
