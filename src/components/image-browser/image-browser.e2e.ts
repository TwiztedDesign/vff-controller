import {newE2EPage} from '@stencil/core/testing';

describe('vff-image-browser', () => {
  let page, component;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<vff-image-browser></vff-image-browser>');
    component = await page.find('vff-image-browser');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });
});
