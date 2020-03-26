import { newE2EPage } from '@stencil/core/testing';

describe('vff-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-container></vff-container>');

    const element = await page.find('vff-container');
    expect(element).toHaveClass('hydrated');
  });
});
