import {newE2EPage} from '@stencil/core/testing';

describe('vff-table', () => {
  let page, component;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('' +
      '<vff-table head-titles="Image, Title, Sub Title, Description, Action, Link">\n' +
      '    <vff-image-browser vff-data="baseItems.{index}.img"></vff-image-browser>\n' +
      '    <vff-text vff-data="baseItems.{index}.title" type="text"></vff-text>\n' +
      '</vff-table>');
    component = await page.find('vff-table');
    await page.waitForChanges();
  });

  it('initial renders', async () => {
    expect(component.shadowRoot).toEqualHtml('' +
      '<slot></slot>' +
      '<table id="table">' +
      '<thead id="table__head"><tr><th>Image</th><th> Title</th><th> Sub Title</th><th> Description</th><th> Action</th><th> Link</th></tr></thead>' +
      '<tbody id="table__body" aria-dropeffect="move"></tbody></table>' +
      '<button id="table__add-row-btn">Add Row</button>');
  });

  it('should render row when Add Row button is clicked', async () => {
    // click add row button
    const addRowButton = await page.find('vff-table >>> #table__add-row-btn');
    await addRowButton.click();
    await page.waitForChanges();

    expect(component.shadowRoot).toEqualHtml('' +
      '<slot></slot>' +
      '<table id="table">' +
      '<thead id="table__head"><tr><th>Image</th><th> Title</th><th> Sub Title</th><th> Description</th><th> Action</th><th> Link</th></tr></thead>' +
      '<tbody id="table__body" aria-dropeffect="move"><tr role="option" aria-grabbed="false">' +
      '<td><vff-image-browser vff-data="baseItems.0.img" class="hydrated" value=""></vff-image-browser></td>' +
      '<td><vff-text vff-data="baseItems.0.title" type="text" class="hydrated"></vff-text></td>' +
      '<td><button>X</button><span class="row__handle" draggable="true">M</span></td></tr></tbody></table>' +
      '<button id="table__add-row-btn">Add Row</button>')
  })
});
