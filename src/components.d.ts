/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface VffContainer {}
  interface VffSection {}
  interface VffTab {
    /**
    * Refers to the id of the element this tab is associated with.
    */
    'for': string;
  }
  interface VffTabs {
    /**
    * default tab to be selected on tabs load when not selected first will be selected
    */
    'default': any;
  }
}

declare global {


  interface HTMLVffContainerElement extends Components.VffContainer, HTMLStencilElement {}
  var HTMLVffContainerElement: {
    prototype: HTMLVffContainerElement;
    new (): HTMLVffContainerElement;
  };

  interface HTMLVffSectionElement extends Components.VffSection, HTMLStencilElement {}
  var HTMLVffSectionElement: {
    prototype: HTMLVffSectionElement;
    new (): HTMLVffSectionElement;
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
    'vff-container': HTMLVffContainerElement;
    'vff-section': HTMLVffSectionElement;
    'vff-tab': HTMLVffTabElement;
    'vff-tabs': HTMLVffTabsElement;
  }
}

declare namespace LocalJSX {
  interface VffContainer {}
  interface VffSection {}
  interface VffTab {
    /**
    * Refers to the id of the element this tab is associated with.
    */
    'for'?: string;
  }
  interface VffTabs {
    /**
    * default tab to be selected on tabs load when not selected first will be selected
    */
    'default'?: any;
    'onTab:active'?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    'vff-container': VffContainer;
    'vff-section': VffSection;
    'vff-tab': VffTab;
    'vff-tabs': VffTabs;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'vff-container': LocalJSX.VffContainer & JSXBase.HTMLAttributes<HTMLVffContainerElement>;
      'vff-section': LocalJSX.VffSection & JSXBase.HTMLAttributes<HTMLVffSectionElement>;
      'vff-tab': LocalJSX.VffTab & JSXBase.HTMLAttributes<HTMLVffTabElement>;
      'vff-tabs': LocalJSX.VffTabs & JSXBase.HTMLAttributes<HTMLVffTabsElement>;
    }
  }
}


