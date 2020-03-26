import { newE2EPage } from '@stencil/core/testing';

describe('vff-section', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-section></vff-section>');

    const element = await page.find('vff-section');
    expect(element).toHaveClass('hydrated');
  });
});
