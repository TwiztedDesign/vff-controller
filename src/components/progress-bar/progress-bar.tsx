import {Component, Host, h, Prop} from '@stencil/core';

@Component({
  tag: 'vff-progress-bar',
  styleUrl: 'progress-bar.css',
  shadow: true
})
export class ProgressBar {
  @Prop() status: number = 0;

  render() {
    return (
      <Host>
        <div id="bar" class={this.status === 100 ? 'success' : null}>
          <div style={{width: `${this.status}%`}} id="value"/>
        </div>
      </Host>
    );
  }
}
