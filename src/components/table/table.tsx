import {Component, Host, h, State, Element, Prop, Method, Event, EventEmitter, Listen, Watch} from '@stencil/core';
import {makeSortable, SORT_EVENTS} from '../../utils/sortable.utils';
import {TableRow, TableTemplate} from "../../interface/interface";
import {isValidAttribute, triggerRemoveEvent} from "../../utils/template.utils";

enum TABLE_UPDATE_EVENT {
  add_row,
  remove_row,
  reorder_rows
}

@Component({
  tag: 'vff-table',
  styleUrl: 'table.css',
  shadow: false
})
export class Table {
  private _rowId: number = 0; // will be added to every row for virtual DOM handling / key attribute
  private _sortable;
  private _tableUpdatesQueue = []; // to use on componentDidUpdate

  @State() firstRender = true;
  @State() tableData = [];
  @State() tableTemplate: TableTemplate = {
    head: {rows: []},
    body: {rows: []}
  };

  @Prop() headTitles: string = '';
  @Prop() value = [];

  @Element() el: HTMLElement;

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
  }) changeTable: EventEmitter;

  constructor() {
    this.handleAddRowClick = this.handleAddRowClick.bind(this);
    this.createRow = this.createRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.onTableSort = this.onTableSort.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  @Method()
  async dataEntryPoint(data) {
    this.updateData(data);
  }

  @Watch('value')
  handleValuePropChange(newValue) {
    this.updateData(newValue);
  }

  @Listen('vff:update', {target: 'document'})
  handleVffUpdate(newValue: CustomEvent) {
    const {dataAttrName, dataAttrValue, value} = newValue.detail;
    if (isValidAttribute(dataAttrName, dataAttrValue, this.el)) {
      this.updateData(value);
    }
  }

  connectedCallback() {
    this.updateData(this.value);
    this.componentInit.emit({
      data: this.tableData,
      el: this.el
    });
  }

  componentDidLoad() {
    this.defineTableTemplate();
    this.removeSlottedContent();
  }

  componentWillRender() {
    /**
     * unwind events since they will be wired back in componentDidRender
     */
    this._sortable && this._sortable.off(SORT_EVENTS.sortUpdate, this.onTableSort);
  }

  componentDidRender() {
    const tbody = this.el.querySelector('tbody');
    const colSpan = tbody.children[0].children.length;
    this._sortable = makeSortable(tbody, {
      placeholder: `<tr><td colspan=${colSpan}></td></tr>`,
      items: 'tr',
      handle: '.row__handle',
      hoverClass: 'is-hovered',
      forcePlaceholderSize: true
    });
    this._sortable.on(SORT_EVENTS.sortUpdate, this.onTableSort);
    this.firstRender = false;
  }

  componentDidUnload() {
    this._sortable && this._sortable.off(SORT_EVENTS.sortUpdate, this.onTableSort);
  }

  componentDidUpdate() {
    const triggerEvent = () => {
      if (this._tableUpdatesQueue.length === 0) {
        return;
      } else {
        this.changeTable.emit({data: this._tableUpdatesQueue.shift()});
        triggerEvent();
      }
    };
    triggerEvent();
  }

  disconnectedCallback() {
    triggerRemoveEvent(this.el);
  }

  private updateData(data) {
    this.tableData = data.map((rowData: object): TableRow => {
      return {rowData, _rowId: this._rowId++}
    });
  }

  private defineTableTemplate() {
    const table = this.el.querySelector('table');
    /**
     * Get table head rows and cols
     */
    const tHead = table.querySelector('thead') as HTMLElement;
    if (tHead) {
      const headRows = tHead.querySelectorAll('tr') || [];
      headRows.forEach(row => {
        const cols = Array.prototype.slice.call(row.children).map(col => col.innerText);
        this.tableTemplate.head.rows.push(cols);
      });
    }
    /**
     * Get table body rows and cols
     */
    const tBody = table.querySelector('tbody');
    if (tBody) {
      const bodyRows = tBody.querySelectorAll('tr') || [];
      bodyRows.forEach(row => {
        const cols = Array.prototype.slice.call(row.children).map(col => {
          return Array.prototype.slice.call(col.children).map(child => {
            return {
              nodeName: child.nodeName,
              attributes: Array.prototype.slice.call(child.attributes).reduce((result, attr) => {
                result[attr.name] = attr.value;
                return result;
              }, {}),
              value: child.value,
              innerText: child.innerText
            };
          })
        });
        this.tableTemplate.body.rows.push(cols);
      })
    }
  }

  private removeSlottedContent() {
    /**
     * Removing elements from DOM to ensure vff controller doesn't see them
     * since they might have vff-data attribute on them, it might produce unexpected
     * behaviour.
     */
    const table = this.el.querySelector('table');
    const parent = table.parentElement;
    parent.removeChild(table);
  }

  private onTableSort(event) {
    const from = event.detail.origin.index;
    const to = event.detail.destination.index;
    const clone = [...this.tableData];
    clone.splice(to, 0, clone.splice(from, 1)[0]);
    this.tableData = clone;
    this._tableUpdatesQueue.push(TABLE_UPDATE_EVENT.reorder_rows);
  }

  private handleAddRowClick() {
    this.tableData = [...this.tableData, {rowData: {}, _rowId: this._rowId++}];
    this._tableUpdatesQueue.push(TABLE_UPDATE_EVENT.add_row);
  }

  private removeRow(id: number) {
    const newArr = [...this.tableData];
    const index = newArr.findIndex(row => {
      return row._rowId == id;
    });
    newArr.splice(index, 1);
    this.tableData = [...newArr];
    this._tableUpdatesQueue.push(TABLE_UPDATE_EVENT.remove_row);
  }

  private createRow(data: TableRow, index: number) {
    const td = (el) => {
      const attributes = Object.keys(el.attributes).reduce((result, name) => {
        result[name] = el.attributes[name].replace('{index}', (index + ''));
        return result;
      }, {});
      // todo: i don't want to know about vff-data
      const value = data.rowData[attributes['vff-data'].split('.').pop()];
      return (
        <el.nodeName {...attributes} value={value}>{el.innerText}</el.nodeName>
      )
    };

    return (
      this.tableTemplate.body.rows.map((row: any[]) => {
        return (
          <tr key={data._rowId.toString()}>
            {row.map(col => (<td class="table__cell">{col.map(td)}</td>))}
            <td class="table__row-controls">
              <div class="row__controls-container">
                <button class="row__remove" onClick={() => this.removeRow(data._rowId)}>✕</button>
                <span class="row__handle">↕</span>
              </div>
            </td>
          </tr>
        );
      }));
  }

  render() {
    return (
      <Host>
        {!this.firstRender && <table class="table__container">
          <thead class="table__head">
          <tr>{this.tableTemplate.head.rows.map((row) => {
            // introducing support for multiple rows in tHead
            return row.map(title => <th>{title}</th>)
          })}</tr>
          </thead>
          <tbody class="table__body">{
            this.tableData.map((row, i) => this.createRow(row, i))
          }</tbody>
          <button class="table__add-row-btn" onClick={this.handleAddRowClick}>Add Row</button>
        </table>
        }
      </Host>
    );
  }
}
