import {newE2EPage} from '@stencil/core/testing';

describe('vff-radio-button', () => {
  describe('test single radio button', () => {
    let page;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('<vff-radio-button checked name="radio-gaga">Radio1</vff-radio-button>');
    });

    it('should have the following HTML structure', async () => {
      const component = await page.find('vff-radio-button');
      expect(component.shadowRoot).toEqualHtml(`
        <label class="element-checkbox">
          <input disabled type="radio"/>
          <div class="element-checkbox-indicator"></div>
          <div class="element-checkbox-text"><slot></slot></div>
        </label>
    `);
    });

    it('should test status update of input radio button from "checked" property on componentDidLoad', async () => {
      const input = await page.find('vff-radio-button >>> input');
      const c = await input.getProperty('checked');
      expect(c).toEqual(true);
    });

    it('single radio button should not be un-clicked', async () => {
      const radioButton = await page.find('vff-radio-button');
      await radioButton.click();
      await page.waitForChanges();
      const c = await radioButton.getProperty('checked');
      expect(c).toEqual(true);
    });
  });

  describe('test vff-radio-button for group functionality', () => {
    let page, components;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent('' +
        '<vff-radio-button name="radio-gaga">Radio1</vff-radio-button>' +
        '<vff-radio-button name="radio-gaga">Radio2</vff-radio-button>' +
        '<vff-radio-button name="radio-gaga">Radio3</vff-radio-button>' +
        '<vff-radio-button checked name="stranger">Another Radio</vff-radio-button>'
      );
      components = await page.findAll('vff-radio-button');
    });

    it('all radio-buttons should have property "checked" set to false', async () => {
      const c0 = await components[0].getProperty('checked');
      const c1 = await components[1].getProperty('checked');
      const c2 = await components[2].getProperty('checked');
      expect(c0).toEqual(false);
      expect(c1).toEqual(false);
      expect(c2).toEqual(false);
    });

    it('radio-button 0 should have property "checked" set to true, rest to false', async () => {
      components[0].click();
      await page.waitForChanges();
      const c0 = await components[0].getProperty('checked');
      const c1 = await components[1].getProperty('checked');
      const c2 = await components[2].getProperty('checked');
      expect(c0).toEqual(true);
      expect(c1).toEqual(false);
      expect(c2).toEqual(false);
    });

    it('should return checked value false when another radio button from same group is clicked', async () => {
      components[0].click();
      await page.waitForChanges();
      components[1].click();
      await page.waitForChanges();
      const c0 = await components[0].getProperty('checked');
      const c1 = await components[1].getProperty('checked');
      const c2 = await components[2].getProperty('checked');
      expect(c0).toEqual(false);
      expect(c1).toEqual(true);
      expect(c2).toEqual(false);
    });

    it('should update checked property when it is inserted dynamically to html', async () => {
      components[0].click();
      await page.waitForChanges();
      await components[1].setAttribute('checked', true);
      await page.waitForChanges();
      const c0 = await components[0].getProperty('checked');
      const c1 = await components[1].getProperty('checked');
      const c2 = await components[2].getProperty('checked');
      expect(c0).toEqual(false);
      expect(c1).toEqual(true);
      expect(c2).toEqual(false);
    });

    it('should not deselect a check box from another radio group', async () => {
      const c3 = await components[3].getProperty('checked');
      expect(c3).toEqual(true);
      components[0].click();
      await page.waitForChanges();
      const c0 = await components[3].getProperty('checked');
      expect(c0).toEqual(true);
      expect(c3).toEqual(true);
    })
  })
});
