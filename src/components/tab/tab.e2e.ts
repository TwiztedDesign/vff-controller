import {newE2EPage} from '@stencil/core/testing';

describe('vff-tab', () => {
  let page, component;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<vff-tab></vff-tab>');
    component = await page.find('vff-tab');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });
});
