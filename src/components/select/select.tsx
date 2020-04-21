import {Component, Host, h, Prop, Event, EventEmitter, Method, State} from '@stencil/core';
import {SelectItem} from "../../interface/interface";

@Component({
  tag: 'vff-select',
  styleUrl: 'select.css',
  shadow: true
})
export class Select {
  @Event({
    eventName: 'vff:change',
    bubbles: true,
    cancelable: true,
    composed: true
  }) changeValue: EventEmitter;

  @State() optionsVisible: boolean = false;
  @State() options: SelectItem[] = [];

  @Prop() multiple: boolean = false;
  @Prop() selectText: string = 'CHOOSE OPTION';
  @Prop({mutable: true}) value: SelectItem[] = []; // chosen option

  constructor() {
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  @Method()
  async addOptions(options: SelectItem | SelectItem[]) {
    if (Array.isArray(options)) {
      this.options = [...this.options, ...options];
    } else if (typeof options === 'object') {
      this.options = [...this.options, options];
    }
  }

  onOptionClick(option: SelectItem) {
    if (this.multiple) { // allow multiple values to be selected
      const excluded = this.value.filter((_option) => {
        return option.key !== _option.key;
      });
      /**
       * Remove option if it is already selectedAsValue and Add if it is not
       */
      if (excluded.length === this.value.length) {
        this.value = [...this.value, {...option}];
      } else {
        this.value = excluded;
      }
    } else { // multiple = false
      this.value = [option];
    }
    this.changeValue.emit({ // emit event only from UI interaction
      data: this.value
    });
    this.optionsVisible = this.multiple;
  }

  handleSelectClick() {
    this.optionsVisible = !this.optionsVisible;
  }

  render() {
    let selectText: string | object[] = this.selectText;
    if (this.value.length > 0) {
      selectText = this.value.map(value => <div class="select__selected">{value.key}</div>);
    }

    return (
      <Host>
        <div class="select__result"
             onClick={() => this.handleSelectClick()}>
          {selectText}
        </div>
        <div class={"select__options" + (this.optionsVisible ? ' show' : '')}>
          {this.options.map((option) => {
            const isSelected = !!this.value.find((val) => {
              return val.key == option.key;
            });
            return (
              <div class={"select__option" + (isSelected ? ' selected' : '')}
                   onClick={() => {
                     this.onOptionClick(option)
                   }}>
                {option.key}
              </div>
            );
          })}
        </div>
      </Host>
    );
  }
}
