import {newE2EPage} from '@stencil/core/testing';

describe('vff-color-picker', () => {
  let page, component;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<vff-color-picker></vff-color-picker>');
    component = await page.find('vff-color-picker');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });
});
