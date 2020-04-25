import {Component, Host, h, State, Element, Prop, Method, Event, EventEmitter} from '@stencil/core';
import {makeSortable, SORT_EVENTS} from '../../utils/sortable.utils';

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
  async dataEntryPoint() {
    const data = [{}, {}, {}];
    this.tableData = data.map(row => {
      return {row, _rowId: this._rowId++}
    });
  }

  componentDidLoad() {
    this.template = this.el.shadowRoot.querySelector('slot')
      .assignedNodes()
      .filter((node) => {
        return node.nodeType == 1; // getting rid of all the text nodes
      });
  }

  componentWillRender() {
    this._sortable && this._sortable.off(SORT_EVENTS.sortUpdate, this.onTableUpdate);
  }

  componentDidRender() {
    this._sortable = makeSortable(this.el.shadowRoot.querySelector('#table__body'), {
      handle: '.row__handle',
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

  private createRow(data: any) {
    return (
      <div class="table__row" key={data._rowId.toString()}>{
        this.template.map(node => {
          return (<span>
            <node.nodeName value={data._rowId}>{node.textContent}</node.nodeName>
          </span>)
        })
      }
        <span>
          <button onClick={() => this.removeRow(data._rowId)}>X</button>
        </span>
        <span class="row__handle">M</span>
      </div>
    )
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <div id="table">
          <div id="table__head">
            <div class="table__row">{this._headTitles.map((title) => {
              return (<span>{title}</span>);
            })}</div>
          </div>
          <div id="table__body">{
            this.tableData.map((row) => this.createRow(row))
          }</div>
        </div>
        <button onClick={this.handleAddRowClick}>Add Row</button>
      </Host>
    );
  }
}
