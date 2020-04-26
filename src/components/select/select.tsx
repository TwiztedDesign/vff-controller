import {Component, Host, h, Prop, Event, EventEmitter, State, Listen, Element, Watch} from '@stencil/core';
import {SelectItem} from "../../interface/interface";
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";

@Component({
  tag: 'vff-select',
  styleUrl: 'select.css',
  shadow: true
})
export class Select {
  @Event({
    eventName: 'vff:init',
    bubbles: true,
    cancelable: true,
    composed: true
  }) componentInit: EventEmitter;

  @Event({
    eventName: 'vff:change',
    bubbles: true,
    cancelable: true,
    composed: true
  }) changeValue: EventEmitter;

  @State() isOptionsVisible: boolean = false;
  @State() _options: SelectItem[] = [];

  @Prop() options: SelectItem[] = [];
  @Prop() multiple: boolean = false;
  @Prop() selectText: string = 'CHOOSE OPTION';
  @Prop({mutable: true}) value: SelectItem[] = []; // chosen option

  @Element() el: HTMLElement;

  constructor() {
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  @Listen('click', {target: "document"})
  toggleOptionsPanel(e) {
    if (e.target !== this.el) {
      this.isOptionsVisible && (this.isOptionsVisible = false);
    }
  }

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.value = value;
    }
  }

  @Watch('options')
  handleOptionsChange(options: SelectItem | SelectItem[]) {
    if (Array.isArray(options)) {
      this._options = [...options];
    } else if (typeof options === 'object') {
      this._options = [options];
    }
  }

  connectedCallback() {
    this.componentInit.emit({
      data: this.value,
      el: this.el
    });
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
  }

  private onOptionClick(option: SelectItem) {
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
      data: this.value,
      el: this.el
    });
    this.isOptionsVisible = this.multiple; // leave options panel open after selection if multiple
  }

  private handleSelectClick() {
    this.isOptionsVisible = !this.isOptionsVisible;
  }

  render() {
    let selectText: string = this.selectText;
    let selectedItems: HTMLElement[] = [];
    if (this.value.length > 0) {
      selectedItems = this.value.map(value => <div class="select__selected">{value.key}</div>);
    }

    return (
      <Host>
        <div id="select"
             onClick={() => this.handleSelectClick()}>
          <div id="select__result">
            {selectedItems.length > 0 && selectedItems[0] || selectText}
            {selectedItems.length > 1 && '...'}
            <div id="select__utils">
              <div id="fade"/>
              {selectedItems.length > 1 && <div id="select__hidden">+{selectedItems.length - 1}</div>}
            </div>
          </div>
          <div class={"select__arrow" + (this.isOptionsVisible ? ' open' : '')}/>
        </div>
        {this.isOptionsVisible && (<div class={"select__options"}>
          {this._options.map((option) => {
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
        </div>)}
      </Host>
    );
  }
}
