/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface VffCheckbox {
    'checked': boolean;
    'value': string;
  }
  interface VffImageBrowser {
    'addFiles': (files: any) => Promise<void>;
    'selectedFiles': File[];
  }
  interface VffRadioButton {
    'checked': boolean;
    'name': string;
    'value': string;
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

  interface HTMLVffImageBrowserElement extends Components.VffImageBrowser, HTMLStencilElement {}
  var HTMLVffImageBrowserElement: {
    prototype: HTMLVffImageBrowserElement;
    new (): HTMLVffImageBrowserElement;
  };

  interface HTMLVffRadioButtonElement extends Components.VffRadioButton, HTMLStencilElement {}
  var HTMLVffRadioButtonElement: {
    prototype: HTMLVffRadioButtonElement;
    new (): HTMLVffRadioButtonElement;
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
    'vff-image-browser': HTMLVffImageBrowserElement;
    'vff-radio-button': HTMLVffRadioButtonElement;
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
  interface VffImageBrowser {
    'onVff:change'?: (event: CustomEvent<any>) => void;
    'selectedFiles'?: File[];
  }
  interface VffRadioButton {
    'checked'?: boolean;
    'name'?: string;
    'onRadioButtonStateChange'?: (event: CustomEvent<any>) => void;
    'onVff:change'?: (event: CustomEvent<any>) => void;
    'value'?: string;
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
    'vff-image-browser': VffImageBrowser;
    'vff-radio-button': VffRadioButton;
    'vff-tab': VffTab;
    'vff-tabs': VffTabs;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'vff-checkbox': LocalJSX.VffCheckbox & JSXBase.HTMLAttributes<HTMLVffCheckboxElement>;
      'vff-image-browser': LocalJSX.VffImageBrowser & JSXBase.HTMLAttributes<HTMLVffImageBrowserElement>;
      'vff-radio-button': LocalJSX.VffRadioButton & JSXBase.HTMLAttributes<HTMLVffRadioButtonElement>;
      'vff-tab': LocalJSX.VffTab & JSXBase.HTMLAttributes<HTMLVffTabElement>;
      'vff-tabs': LocalJSX.VffTabs & JSXBase.HTMLAttributes<HTMLVffTabsElement>;
    }
  }
}


