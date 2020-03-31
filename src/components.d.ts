/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
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
    'vff-tab': HTMLVffTabElement;
    'vff-tabs': HTMLVffTabsElement;
  }
}

declare namespace LocalJSX {
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
    'vff-tab': VffTab;
    'vff-tabs': VffTabs;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'vff-tab': LocalJSX.VffTab & JSXBase.HTMLAttributes<HTMLVffTabElement>;
      'vff-tabs': LocalJSX.VffTabs & JSXBase.HTMLAttributes<HTMLVffTabsElement>;
    }
  }
}


