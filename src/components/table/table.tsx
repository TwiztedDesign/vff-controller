import {Component, Host, h, State, Element, Prop, Method, Event, EventEmitter} from '@stencil/core';
import {makeSortable, SORT_EVENTS} from '../../utils/sortable.utils';
import {TableRow, TableTemplate} from "../../interface/interface";

enum TABLE_UPDATE_EVENT {
  add_row,
  remove_row,
  reorder_rows
}

@Component({
  tag: 'vff-table',
  styleUrl: 'table.css',
  shadow: true
})
export class Table {
  private _rowId: number = 0; // will be added to every row for virtual DOM handling / key attribute
  private _sortable;
  private tableUpdatesQueue = []; // to use on componentDidUpdate

  @State() tableData = [];
  @State() tableTemplate: TableTemplate = {
    head: {rows: []},
    body: {rows: []}
  };

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
    this.onTableSort = this.onTableSort.bind(this);
  }

  @Method()
  async dataEntryPoint(data) {
    this.tableData = data.map((rowData: object): TableRow => {
      return {rowData, _rowId: this._rowId++}
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
    this._sortable = makeSortable(this.el.shadowRoot.querySelector('#table__body'), {
      handle: '.row__handle',
      hoverClass: 'is-hovered',
      forcePlaceholderSize: true
    });
    this._sortable.on(SORT_EVENTS.sortUpdate, this.onTableSort);
  }

  componentDidUnload() {
    this._sortable && this._sortable.off(SORT_EVENTS.sortUpdate, this.onTableSort);
  }

  componentDidUpdate() {
    const triggerEvent = () => {
      if (this.tableUpdatesQueue.length === 0) {
        return;
      } else {
        this.changeTable.emit({data: this.tableUpdatesQueue.shift()});
        triggerEvent();
      }
    };
    triggerEvent();
  }

  private defineTableTemplate() {
    const table = this.el.shadowRoot.querySelector('slot')
      .assignedNodes()
      .filter((node) => {
        return node.nodeType == 1; // getting rid of all the text nodes
      })[0] as HTMLElement;
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
    this.el.shadowRoot.querySelector('slot')
      .assignedNodes()
      .filter((node) => {
        return node.nodeType == 1; // getting rid of all the text nodes
      }).forEach(node => {
      /**
       * Removing slotted elements from DOM to ensure vff controller doesn't see them
       * since they might have vff-data attribute on them, it might produce unexpected
       * behaviour.
       */
      const parent = node.parentElement;
      parent.removeChild(node);
    });
  }

  private onTableSort(event) {
    const from = event.detail.origin.index;
    const to = event.detail.destination.index;
    const clone = [...this.tableData];
    clone.splice(to, 0, clone.splice(from, 1)[0]);
    this.tableData = clone;
    this.tableUpdatesQueue.push(TABLE_UPDATE_EVENT.reorder_rows);
  }

  private handleAddRowClick() {
    this.tableData = [...this.tableData, {_rowId: this._rowId++}];
    this.tableUpdatesQueue.push(TABLE_UPDATE_EVENT.add_row);
  }

  private removeRow(id: number) {
    const newArr = [...this.tableData];
    const index = newArr.findIndex(row => {
      return row._rowId == id;
    });
    newArr.splice(index, 1);
    this.tableData = [...newArr];
    this.tableUpdatesQueue.push(TABLE_UPDATE_EVENT.remove_row);
  }

  private createRow(data: TableRow, index: number) {
    const td = (el) => {
      const attributes = Object.keys(el.attributes).reduce((result, name) => {
        result[name] = el.attributes[name].replace('{index}', (index + ''));
        return result;
      }, {});
      return (
        <el.nodeName {...attributes} value={el.value}>{el.innerText}</el.nodeName>
      )
    };

    return (
      this.tableTemplate.body.rows.map((row: any[]) => {
        return (
          <tr key={data._rowId.toString()}>
            {row.map(col => (<td>{col.map(td)}</td>))}
            <td>
              <button onClick={() => this.removeRow(data._rowId)}>X</button>
              <span class="row__handle">M</span>
            </td>
          </tr>
        );
      }));
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <table id="table">
          <thead id="table__head">
          <tr>{this.tableTemplate.head.rows.map((row) => {
            // introducing support for multiple rows in tHead
            return row.map(title => <th>{title}</th>)
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
