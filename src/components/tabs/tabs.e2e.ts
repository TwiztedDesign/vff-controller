import { newE2EPage } from '@stencil/core/testing';

describe('vff-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-tabs></vff-tabs>');

    const element = await page.find('vff-tabs');
    expect(element).toHaveClass('hydrated');
  });
});
