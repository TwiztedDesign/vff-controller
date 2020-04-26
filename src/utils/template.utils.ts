export function isValidAttribute(attrName: string, attrValue: string, el: HTMLElement): boolean {
  const currentAttrValue = el.getAttribute(attrName);
  return currentAttrValue && currentAttrValue == attrValue;
}
