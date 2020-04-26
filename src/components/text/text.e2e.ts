import { newE2EPage } from '@stencil/core/testing';

describe('vff-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-text></vff-text>');

    const element = await page.find('vff-text');
    expect(element).toHaveClass('hydrated');
  });
});
