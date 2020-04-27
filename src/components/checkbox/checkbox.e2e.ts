import {newE2EPage} from '@stencil/core/testing';

describe('vff-checkbox', () => {
  let page, component;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<vff-checkbox></vff-checkbox>');
    component = await page.find('vff-checkbox');

  });

  it('input field is updated when checked property is set', async () => {
    const input = await page.find('vff-checkbox >>> input');
    const checkedPre = await input.getProperty('checked');
    expect(checkedPre).toEqual(false);

    component.setAttribute('checked', true);
    await page.waitForChanges();
    const checkedPost = await input.getProperty('checked');
    expect(checkedPost).toEqual(true);
  });

  it('should fire vff:change event when user clicks the check box', async () => {
    const vffChange = await page.spyOnEvent('vff:change');
    await component.click();
    await page.waitForChanges();
    expect(vffChange).toHaveReceivedEventDetail({data: true, el: {"s-p": []}});
  });

  it('should not fire vff:change event when user injects status with value property', async () => {
    const vffChange = await page.spyOnEvent('vff:change');
    component.setProperty('value', true);
    await page.waitForChanges();
    expect(vffChange).not.toHaveReceivedEvent();
  });
});
