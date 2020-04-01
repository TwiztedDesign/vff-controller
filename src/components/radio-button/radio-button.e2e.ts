import { newE2EPage } from '@stencil/core/testing';

describe('vff-radio-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-radio-button></vff-radio-button>');

    const element = await page.find('vff-radio-button');
    expect(element).toHaveClass('hydrated');
  });
});
