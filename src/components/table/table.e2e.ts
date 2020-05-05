import {newE2EPage} from '@stencil/core/testing';

describe('vff-table', () => {
  let page, component;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('' +
      '<vff-table>\n' +
      '      <table>\n' +
      '        <thead>\n' +
      '        <tr>\n' +
      '          <th>Image</th>\n' +
      '          <th>Text</th>\n' +
      '        </tr>\n' +
      '        </thead>\n' +
      '        <tbody>\n' +
      '        <tr>\n' +
      '          <td><vff-image-browser vff-data="baseItems.{index}.img"></vff-image-browser></td>\n' +
      '          <td><vff-text vff-data="baseItems.{index}.title" type="text"></vff-text></td>\n' +
      '        </tr>\n' +
      '        </tbody>\n' +
      '      </table>\n' +
      '    </vff-table>');
    component = await page.find('vff-table');
    await page.waitForChanges();
  });

  it('initial renders', async () => {
    expect(component).toEqualHtml('' +
      '<vff-table class="hydrated">  <table class="table__container"><thead class="table__head"><tr><th>Image</th><th>Text</th></tr></thead><tbody class="table__body" aria-dropeffect="move"></tbody><button class="table__add-row-btn">Add Row</button></table></vff-table>');
  });

  it('should render row when Add Row button is clicked', async () => {
    // click add row button
    const addRowButton = await page.find('.table__add-row-btn');
    await addRowButton.click();
    await page.waitForChanges();

    expect(component).toEqualHtml('' +
      '<vff-table class="hydrated">  <table class="table__container"><thead class="table__head"><tr><th>Image</th><th>Text</th></tr></thead><tbody class="table__body" aria-dropeffect="move"><tr role="option" aria-grabbed="false"><td class="table__cell"><vff-image-browser vff-data="baseItems.0.img" class="hydrated" value=""></vff-image-browser></td><td class="table__cell"><vff-text vff-data="baseItems.0.title" type="text" class="hydrated"></vff-text></td><td class="table__row-controls"><div class="row__controls-container"><button class="row__remove">✕</button><span class="row__handle" draggable="true">↕</span></div></td></tr></tbody><button class="table__add-row-btn">Add Row</button></table></vff-table>')
  })
});
