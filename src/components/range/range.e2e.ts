import { newE2EPage } from '@stencil/core/testing';

describe('vff-range', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-range></vff-range>');

    const element = await page.find('vff-range');
    expect(element).toHaveClass('hydrated');
  });
});
