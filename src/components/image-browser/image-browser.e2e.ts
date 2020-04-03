import { newE2EPage } from '@stencil/core/testing';

describe('vff-image-browser', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-image-browser></vff-image-browser>');

    const element = await page.find('vff-image-browser');
    expect(element).toHaveClass('hydrated');
  });
});
