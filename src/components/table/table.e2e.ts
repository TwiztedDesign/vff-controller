import { newE2EPage } from '@stencil/core/testing';

describe('vff-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-table></vff-table>');

    const element = await page.find('vff-table');
    expect(element).toHaveClass('hydrated');
  });
});
