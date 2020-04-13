import { newE2EPage } from '@stencil/core/testing';

describe('vff-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-progress-bar></vff-progress-bar>');

    const element = await page.find('vff-progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});
