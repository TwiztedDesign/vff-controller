import {newE2EPage} from '@stencil/core/testing';

describe('vff-tabs', () => {
  let page, element;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      '<vff-tabs>\n' +
      '  <vff-tab for="section1">First</vff-tab>\n' +
      '  <vff-tab for="section2">Second</vff-tab>\n' +
      '</vff-tabs>\n' +
      '\n' +
      '<section id="section1" class="section ctrl-container"></section>\n' +
      '<section id="section2" class="section ctrl-container"></section>');
    element = await page.find('vff-tabs');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('should add .active class to first tab if no default attribute is set', async () => {
    const tabs = await page.findAll('vff-tab');
    expect(tabs[0]).toHaveClass('active');
  });

  it('should add .active class to first tab if default attribute is misspelled', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<vff-tabs default="sec">\n' +
      '  <vff-tab for="section1">First</vff-tab>\n' +
      '  <vff-tab for="section2">Second</vff-tab>\n' +
      '</vff-tabs>\n' +
      '\n' +
      '<section id="section1" class="section ctrl-container"></section>\n' +
      '<section id="section2" class="section ctrl-container"></section>');

    await page.waitForChanges();
    const tabs = await page.findAll('vff-tab');
    expect(tabs[0]).toHaveClass('active');
  });

  it('should add .active class to tab specified in default attribute', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<vff-tabs default="section2">\n' +
      '  <vff-tab for="section1">First</vff-tab>\n' +
      '  <vff-tab for="section2">Second</vff-tab>\n' +
      '</vff-tabs>\n' +
      '\n' +
      '<section id="section1" class="section ctrl-container"></section>\n' +
      '<section id="section2" class="section ctrl-container"></section>');

    await page.waitForChanges();
    const tabs = await page.findAll('vff-tab');
    expect(tabs[1]).toHaveClass('active');
  });

  it('should add .active class to vff-tab that was clicked', async () => {
    const tabs = await page.findAll('vff-tab');
    tabs[1].click();
    await page.waitForChanges();
    expect(tabs[1]).toHaveClass('active');
  });

  it('should add .active class to section that bound to tab that was clicked', async () => {
    const tabs = await page.findAll('vff-tab');
    const section = await page.findAll('section');
    tabs[1].click();
    await page.waitForChanges();
    expect(section[1]).toHaveClass('active');
  });
});
