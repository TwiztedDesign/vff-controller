import {newE2EPage} from '@stencil/core/testing';

const File = function (data, fileName, options) {
  this.data = data;
  this.fileName = fileName;
  this.type = options.type;
};

describe('vff-image-browser', () => {
  let page, component, errorContainer, errorMsgContainer;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<vff-image-browser></vff-image-browser>');
    component = await page.find('vff-image-browser');
    errorContainer = await page.find('vff-image-browser >>> #error-msg');
    errorMsgContainer = await page.find('vff-image-browser >>> #error__msg-text');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('should show error when trying to add files of not supported type', async () => {
    expect(errorContainer).not.toHaveClass('active');
    const file = new File(['(⌐□_□)'], 'chucknorris.webp', {type: 'application/js'});
    // current numOfFilesLimit is set to 1
    await component.callMethod('addFiles', [file]);
    await page.waitForChanges();
    expect(errorContainer).toHaveClass('active');
    expect((await errorMsgContainer)
      .innerText).toContain('Only the following file types allowed:');
  });

  it('should show error when trying to add files amount more than the allowed limit', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'});
    expect(errorContainer).not.toHaveClass('active');
    // current numOfFilesLimit is set to 1
    await component.callMethod('addFiles', [file, file]);
    await page.waitForChanges();
    expect(errorContainer).toHaveClass('active');
    expect((await errorMsgContainer)
      .innerText).toContain('Allowed number of files for selection is:');
  })
});
