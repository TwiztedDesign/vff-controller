export function isValidAttribute(attrName: string, attrValue: string, el: HTMLElement): boolean {
  const currentAttrValue = el.getAttribute(attrName);
  return currentAttrValue && currentAttrValue == attrValue;
}

export function triggerRemoveEvent(data: any) {
  window.dispatchEvent(new CustomEvent("vff:remove", {
    detail: {data}
  }));
}
