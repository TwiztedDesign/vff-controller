import { newE2EPage } from '@stencil/core/testing';

describe('vff-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-tab></vff-tab>');

    const element = await page.find('vff-tab');
    expect(element).toHaveClass('hydrated');
  });
});
