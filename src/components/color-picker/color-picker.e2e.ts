import { newE2EPage } from '@stencil/core/testing';

describe('vff-color-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-color-picker></vff-color-picker>');

    const element = await page.find('vff-color-picker');
    expect(element).toHaveClass('hydrated');
  });
});
