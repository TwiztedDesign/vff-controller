import { newE2EPage } from '@stencil/core/testing';

describe('vff-video-time', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vff-video-time></vff-video-time>');

    const element = await page.find('vff-video-time');
    expect(element).toHaveClass('hydrated');
  });
});
