/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  SelectItem,
} from './interface/interface';

export namespace Components {
  interface VffCheckbox {
    'checked': boolean;
    'value': string;
  }
  interface VffColorPicker {
    'value': string;
  }
  interface VffImageBrowser {
    'addFiles': (files: any) => Promise<void>;
    'error': string;
    'progress': boolean;
    'progressStatus': number;
    'selectedFiles': File[];
  }
  interface VffProgressBar {
    'status': number;
  }
  interface VffRadioButton {
    'checked': boolean;
    'name': string;
    'value': string;
  }
  interface VffSelect {
    'addOptions': (options: SelectItem | SelectItem[]) => Promise<void>;
    'multiple': boolean;
    'selectText': string;
    'value': SelectItem[];
  }
  interface VffTab {
    /**
    * Refers to the id of the element this tab is associated with.
    */
    'for': string;
  }
  interface VffTabs {
    /**
    * Default tab to be selected when tabs component loads. When property is not provided, default will be the most first tab
    */
    'default': string;
  }
}

declare global {


  interface HTMLVffCheckboxElement extends Components.VffCheckbox, HTMLStencilElement {}
  var HTMLVffCheckboxElement: {
    prototype: HTMLVffCheckboxElement;
    new (): HTMLVffCheckboxElement;
  };

  interface HTMLVffColorPickerElement extends Components.VffColorPicker, HTMLStencilElement {}
  var HTMLVffColorPickerElement: {
    prototype: HTMLVffColorPickerElement;
    new (): HTMLVffColorPickerElement;
  };

  interface HTMLVffImageBrowserElement extends Components.VffImageBrowser, HTMLStencilElement {}
  var HTMLVffImageBrowserElement: {
    prototype: HTMLVffImageBrowserElement;
    new (): HTMLVffImageBrowserElement;
  };

  interface HTMLVffProgressBarElement extends Components.VffProgressBar, HTMLStencilElement {}
  var HTMLVffProgressBarElement: {
    prototype: HTMLVffProgressBarElement;
    new (): HTMLVffProgressBarElement;
  };

  interface HTMLVffRadioButtonElement extends Components.VffRadioButton, HTMLStencilElement {}
  var HTMLVffRadioButtonElement: {
    prototype: HTMLVffRadioButtonElement;
    new (): HTMLVffRadioButtonElement;
  };

  interface HTMLVffSelectElement extends Components.VffSelect, HTMLStencilElement {}
  var HTMLVffSelectElement: {
    prototype: HTMLVffSelectElement;
    new (): HTMLVffSelectElement;
  };

  interface HTMLVffTabElement extends Components.VffTab, HTMLStencilElement {}
  var HTMLVffTabElement: {
    prototype: HTMLVffTabElement;
    new (): HTMLVffTabElement;
  };

  interface HTMLVffTabsElement extends Components.VffTabs, HTMLStencilElement {}
  var HTMLVffTabsElement: {
    prototype: HTMLVffTabsElement;
    new (): HTMLVffTabsElement;
  };
  interface HTMLElementTagNameMap {
    'vff-checkbox': HTMLVffCheckboxElement;
    'vff-color-picker': HTMLVffColorPickerElement;
    'vff-image-browser': HTMLVffImageBrowserElement;
    'vff-progress-bar': HTMLVffProgressBarElement;
    'vff-radio-button': HTMLVffRadioButtonElement;
    'vff-select': HTMLVffSelectElement;
    'vff-tab': HTMLVffTabElement;
    'vff-tabs': HTMLVffTabsElement;
  }
}

declare namespace LocalJSX {
  interface VffCheckbox {
    'checked'?: boolean;
    'onVff:change'?: (event: CustomEvent<any>) => void;
    'value'?: string;
  }
  interface VffColorPicker {
    'onVff:change'?: (event: CustomEvent<any>) => void;
    'value'?: string;
  }
  interface VffImageBrowser {
    'error'?: string;
    'onVff:change'?: (event: CustomEvent<any>) => void;
    'progress'?: boolean;
    'progressStatus'?: number;
    'selectedFiles'?: File[];
  }
  interface VffProgressBar {
    'status'?: number;
  }
  interface VffRadioButton {
    'checked'?: boolean;
    'name'?: string;
    'onRadioButtonStateChange'?: (event: CustomEvent<any>) => void;
    'onVff:change'?: (event: CustomEvent<any>) => void;
    'value'?: string;
  }
  interface VffSelect {
    'multiple'?: boolean;
    'onVff:change'?: (event: CustomEvent<any>) => void;
    'selectText'?: string;
    'value'?: SelectItem[];
  }
  interface VffTab {
    /**
    * Refers to the id of the element this tab is associated with.
    */
    'for'?: string;
  }
  interface VffTabs {
    /**
    * Default tab to be selected when tabs component loads. When property is not provided, default will be the most first tab
    */
    'default'?: string;
  }

  interface IntrinsicElements {
    'vff-checkbox': VffCheckbox;
    'vff-color-picker': VffColorPicker;
    'vff-image-browser': VffImageBrowser;
    'vff-progress-bar': VffProgressBar;
    'vff-radio-button': VffRadioButton;
    'vff-select': VffSelect;
    'vff-tab': VffTab;
    'vff-tabs': VffTabs;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'vff-checkbox': LocalJSX.VffCheckbox & JSXBase.HTMLAttributes<HTMLVffCheckboxElement>;
      'vff-color-picker': LocalJSX.VffColorPicker & JSXBase.HTMLAttributes<HTMLVffColorPickerElement>;
      'vff-image-browser': LocalJSX.VffImageBrowser & JSXBase.HTMLAttributes<HTMLVffImageBrowserElement>;
      'vff-progress-bar': LocalJSX.VffProgressBar & JSXBase.HTMLAttributes<HTMLVffProgressBarElement>;
      'vff-radio-button': LocalJSX.VffRadioButton & JSXBase.HTMLAttributes<HTMLVffRadioButtonElement>;
      'vff-select': LocalJSX.VffSelect & JSXBase.HTMLAttributes<HTMLVffSelectElement>;
      'vff-tab': LocalJSX.VffTab & JSXBase.HTMLAttributes<HTMLVffTabElement>;
      'vff-tabs': LocalJSX.VffTabs & JSXBase.HTMLAttributes<HTMLVffTabsElement>;
    }
  }
}


