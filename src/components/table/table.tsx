import {Component, Host, h, State, Element, Prop, Method, Event, EventEmitter} from '@stencil/core';
import {makeSortable, SORT_EVENTS} from '../../utils/sortable.utils';
import {TableRow} from "../../interface/interface";

@Component({
  tag: 'vff-table',
  styleUrl: 'table.css',
  shadow: true
})
export class Table {
  private _rowId: number = 0; // will be added to every row for virtual DOM handling / key attribute
  private _headTitles; // table titles, comma delimited
  private _sortable;

  @State() tableData = [];
  @State() template: Node[] = []; // will be defined in slot

  @Prop() headTitles: string = '';
  @Element() el: HTMLElement;

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
    this.onTableUpdate = this.onTableUpdate.bind(this);
    this._headTitles = this.headTitles.split(',');
  }

  @Method()
  async dataEntryPoint(data) {
    this.tableData = data.map((rowData: object): TableRow => {
      return {rowData, _rowId: this._rowId++}
    });
  }

  componentDidLoad() {
    this.template = this.el.shadowRoot.querySelector('slot').assignedElements();
    this.template.forEach(node => {
      /**
       * Removing slotted elements from DOM to ensure vff controller doesn't see them
       * since they might have vff-data attribute on them, it might produce unexpected
       * behaviour.
       */
      const parent = node.parentElement;
      parent.removeChild(node);
    });
  }

  componentWillRender() {
    this._sortable && this._sortable.off(SORT_EVENTS.sortUpdate, this.onTableUpdate);
  }

  componentDidRender() {
    this._sortable = makeSortable(this.el.shadowRoot.querySelector('#table__body'), {
      handle: '.row__handle',
      hoverClass: 'is-hovered',
      forcePlaceholderSize: true
    });
    this._sortable.on(SORT_EVENTS.sortUpdate, this.onTableUpdate);
  }

  componentDidUnload() {
    this._sortable && this._sortable.off(SORT_EVENTS.sortUpdate, this.onTableUpdate);
  }

  private onTableUpdate() {
    this.changeTable.emit();
  }

  private handleAddRowClick() {
    this.tableData = [...this.tableData, {_rowId: this._rowId++}];
    this.onTableUpdate();
  }

  private removeRow(id: number) {
    const newArr = [...this.tableData];
    const index = newArr.findIndex(row => {
      return row._rowId == id;
    });
    newArr.splice(index, 1);
    this.tableData = [...newArr];
    this.onTableUpdate();
  }

  private createRow(data: TableRow, index: number) {
    return (
      <tr key={data._rowId.toString()}>{
        this.template.map((el: HTMLElement) => {
          let attr = {};
          if (el.attributes.length > 0) {
            Array.prototype.slice.call(el.attributes)
              .forEach(_attr => {
                attr[_attr.name] = _attr.value.replace('{index}', (index + ''));
              })
          }
          return (<td>
            {/*
            // @ts-ignore*/}
            <el.nodeName {...attr} value={el.value}>{el.innerText}</el.nodeName>
          </td>)
        })
      }
        <td>
          <button onClick={() => this.removeRow(data._rowId)}>X</button>
          <span class="row__handle">M</span>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <table id="table">
          <thead id="table__head">
          <tr>{this._headTitles.map((title) => {
            return (<th>{title}</th>);
          })}</tr>
          </thead>
          <tbody id="table__body">{
            this.tableData.map((row, i) => this.createRow(row, i))
          }</tbody>
        </table>
        <button id="table__add-row-btn" onClick={this.handleAddRowClick}>Add Row</button>
      </Host>
    );
  }
}
