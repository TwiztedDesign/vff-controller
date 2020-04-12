import {Component, Host, h, Prop, Watch, State} from '@stencil/core';

function processStatus(val) {
  let result;
  if (val % 1 === 0) { // num 0, 1 ... to 100
    result = val;
  } else if (val % 1 !== 0) { // num 0, 0.1 ... to 1
    result = val * 100;
  }
  return result;
}

@Component({
  tag: 'vff-progress-bar',
  styleUrl: 'progress-bar.css',
  shadow: true
})
export class ProgressBar {
  @State() progress: number = 0;

  @Prop() status: number = 0;

  @Watch('status')
  handleStatusChange(newValue) {
    this.progress = processStatus(newValue);
  }

  componentDidLoad() {
    this.progress = processStatus(this.status)
  }

  render() {
    return (
      <Host>
        <div>{this.progress}</div>
        <progress max={100} value={50}></progress>
      </Host>
    );
  }

}
