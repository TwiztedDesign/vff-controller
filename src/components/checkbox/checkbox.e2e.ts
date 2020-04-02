import {newE2EPage} from '@stencil/core/testing';

describe('vff-checkbox', () => {
  let page, component;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<vff-checkbox></vff-checkbox>');
    component = await page.find('vff-checkbox');

  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('should have the following HTML structure', async () => {
    expect(component.shadowRoot).toEqualHtml(`
        <label class="element-checkbox">
          <input disabled type="checkbox"/>
          <div class="element-checkbox-indicator"></div>
          <div class="element-checkbox-text"><slot></slot></div>
        </label>
    `);
  });

  it('input field is updated when checked property is set', async () => {
    const input = await page.find('vff-checkbox >>> input');
    const checkedPre = await input.getProperty('checked');
    expect(checkedPre).toEqual(false);

    component.setAttribute('checked', true);
    await page.waitForChanges();
    const checkedPost = await input.getProperty('checked');
    expect(checkedPost).toEqual(true);
  })
});
