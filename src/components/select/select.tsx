import {Component, Host, h, Prop, Event, EventEmitter, State, Listen, Element, Watch} from '@stencil/core';
import {SelectItem} from "../../interface/interface";
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";

/**
 * @example
 * <vff-select></vff-select>
 */
@Component({
  tag: 'vff-select',
  styleUrl: 'select.css',
  shadow: true
})
export class Select {
  private _panelAdjusted = false; // used to limit amount of times the options panel will be adjusted in viewport

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

  /** Sets or return all available options */
  @Prop() options: SelectItem[] = [];
  /** Enables multiple selection */
  @Prop() multiple: boolean = false;
  /** Sets text to show for a user */
  @Prop() selectText: string = 'CHOOSE OPTION';
  /** Sets or returns selected options */
  @Prop({mutable: true}) value: SelectItem[] = []; // chosen option

  @Element() el: HTMLElement;

  constructor() {
    this.onOptionClick = this.onOptionClick.bind(this);
    this.validateOptions = this.validateOptions.bind(this);
  }

  @Listen('click', {target: "document"})
  toggleOptionsPanel(e) {
    if (e.target !== this.el) { // click outside of options should close the options
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

  @Watch('isOptionsVisible')
  handleOptionsVisible() {
    /**
     * reset _panelAdjusted flag when options are closed
     */
    !this.isOptionsVisible && (this._panelAdjusted = false);
  }

  @Watch('value')
  validateValue(newValue) {
    /**
     * Since value can be set from out side the component to be undefined,
     * we'd like to reset it to array to make sure the code doesn't break
     * in places when operations on value are operations on array.
     */
    if (!Array.isArray(newValue)) this.value = [];
  }

  @Watch('options')
  handleOptionsChange(options: SelectItem | SelectItem[]) {
    this.validateOptions(options);
  }

  connectedCallback() {
    /**
     * when options are set before the component had it's listeners ready
     */
    this.validateOptions(this.options);
    this.componentInit.emit({
      data: this.value,
      el: this.el
    });
  }

  componentDidRender() {
    this.isOptionsVisible && this.adjustOptionsPanelPosition();
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
  }

  private validateOptions(options: SelectItem | SelectItem[]) {
    let newOptions;
    if (Array.isArray(options)) {
      newOptions = [...options];
    } else if (typeof options === 'object') {
      newOptions = [options];
    }
    /**
     * When new options are received we're making sure that already
     * selected values are still available in the new options.
     */
    if (newOptions.length === this._options.length) {
      // Cross reference values with new options by index.
      this.value = this.value.map(selected => {
        const indexInOldOptions = this._options.findIndex(_option => {
          return _option.key == selected.key;
        });
        return newOptions[indexInOldOptions];
      });
    } else {
      /**
       * Cross reference values with new options by keys.
       * Values that are not found in the new options are removed.
       */
      this.value = this.value.filter(selected => {
        return newOptions.find(_option => {
          return selected.key == _option.key;
        });
      });
    }
    this._options = newOptions;
  }

  private adjustOptionsPanelPosition() {
    if (this._panelAdjusted) return; // adjust panel only the first time it opens
    const optionsPanel = this.el.shadowRoot.querySelector('#select__options') as HTMLElement;
    const optionsRect = optionsPanel.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;
    if (optionsRect.bottom > windowHeight) {
      optionsPanel.style.top = (-1 * optionsRect.height) + 'px';
    } else {
      optionsPanel.style.top = `100%`;
    }
    this._panelAdjusted = true;
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

  private renderOptionsPanel() {
    return (
      <div id={"select__options"}>
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
      </div>
    )
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
              {selectedItems.length > 0 && <div id="fade"/>}
              {selectedItems.length > 1 && <div id="select__hidden">+{selectedItems.length - 1}</div>}
            </div>
          </div>
          <div class={"select__arrow" + (this.isOptionsVisible ? ' open' : '')}/>
        </div>
        {this.isOptionsVisible && this.renderOptionsPanel()}
      </Host>
    );
  }
}
