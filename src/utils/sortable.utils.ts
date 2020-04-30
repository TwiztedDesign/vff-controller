import sortable from 'html5sortable/dist/html5sortable.cjs'

export const SORT_EVENTS = {
  sortStart: 'sortstart', // This event is triggered when the user starts sorting and the DOM position has not yet changed.
  sortEnd: 'sortend', // This event is triggered when the user stops sorting and the DOM position has not yet changed.
  sortUpdate: 'sortupdate' // This event is triggered when the user stopped sorting and the DOM position has changed.
};

function _Sortable(target: HTMLElement, options: object) {
  this.target = sortable(target, {...options})[0];
}

_Sortable.prototype.on = function (event: string, callback) {
  this.target.addEventListener(event, callback);
};

_Sortable.prototype.off = function (event: string, callback) {
  this.target.removeEventListener(event, callback);
};

export function makeSortable(target: HTMLElement, options: object): HTMLElement {
  return new _Sortable(target, options);
}
