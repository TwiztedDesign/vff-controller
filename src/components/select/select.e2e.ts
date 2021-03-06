import {newE2EPage} from '@stencil/core/testing';
import {SelectItem} from "../../interface/interface";

describe('vff-select', () => {
  let page, component;

  const singleOption: SelectItem = {key: 'This', value: 'is_a_test'};

  const multipleOptions: SelectItem[] = [
    {key: 'key1', value: 'value1'},
    {key: 'key2', value: 'value2'},
    {key: 'key3', value: 'value3'}
  ];

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<div id="panel-killer">Click Me</div><vff-select></vff-select>');
    component = await page.find('vff-select');
  });

  it('should add single option to select options', async () => {
    // start: open options panel
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();
    // end: open options panel
    const selectItems = await page.find('vff-select >>> #select__options');
    expect(selectItems.children.length).toEqual(0);
    await component.setProperty('options', singleOption);
    await page.waitForChanges();
    expect(selectItems.children.length).toEqual(1);
  });

  it('should add multiple options to select options', async () => {
    // open options panel
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();

    const selectItems = await page.find('vff-select >>> #select__options');
    expect(selectItems.children.length).toEqual(0);

    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();
    expect(selectItems.children.length).toEqual(3);
  });

  it('should replace existing options', async () => {
    // set options
    await component.setProperty('options', singleOption);
    await page.waitForChanges();

    // reset options
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();

    // open options panel
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();

    const selectItems = await page.find('vff-select >>> #select__options');
    expect(selectItems.children.length).toEqual(3);
  });

  it('should set value when option is clicked', async () => {
    let value;
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();
    value = await component.getProperty('value');
    expect(value.length).toEqual(0);
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();
    const option = await page.find('vff-select >>> .select__option');
    await option.click();
    await page.waitForChanges();
    value = await component.getProperty('value');
    expect(value).toEqual([{key: 'key1', value: 'value1'}]);
  });

  it('should exclude value when it is clicked for the second time', async () => {
    let value;
    component.setProperty('multiple', true);
    await page.waitForChanges();
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();
    const option = await page.find('vff-select >>> .select__option');
    await option.click();
    await page.waitForChanges();
    value = await component.getProperty('value');
    expect(value).toEqual([{key: 'key1', value: 'value1'}]);
    await option.click();
    await page.waitForChanges();
    value = await component.getProperty('value');
    expect(value).toEqual([]);
  });

  it('should emit vff:change event when user selects value from UI', async () => {
    // setup
    const vffChange = await page.spyOnEvent('vff:change');
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();
    const option = await page.find('vff-select >>> .select__option');
    await option.click();
    await page.waitForChanges();
    // do the test
    expect(vffChange).toHaveReceivedEventDetail({"data": [{"key": "key1", "value": "value1"}], el: {"s-p": []}});
  });

  it('should have same value sent with vff:change as the component\'s value Prop', async () => {
    const vffChange = await page.spyOnEvent('vff:change');

    // set options
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();

    // open options panel
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();

    // choose first option
    const option = await page.find('vff-select >>> .select__option');
    await option.click();
    await page.waitForChanges();

    // do the test
    const value = await component.getProperty('value');
    expect(value).toEqual([{"key": "key1", "value": "value1"}]);
    expect(vffChange).toHaveReceivedEventDetail({"data": [{"key": "key1", "value": "value1"}], el: {"s-p": []}});
  });

  it('should present all chosen keys in select__result', async () => {
    component.setProperty('multiple', true);
    await page.waitForChanges();
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();
    const options = await page.findAll('vff-select >>> .select__option');
    options[0].click();
    await page.waitForChanges();
    options[1].click();
    await page.waitForChanges();
    options[2].click();
    await page.waitForChanges();
    expect(selectBtn.innerHTML).toEqual(
      '<div id="select__result"><div class="select__selected">key1</div>...<div id="select__utils"><div id="fade"></div><div id="select__hidden">+2</div></div></div><div class="select__arrow open"></div>'
    );
  });

  it('should toggle class "selected" on options', async () => {
    component.setProperty('multiple', true);
    await page.waitForChanges();
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();
    const option = await page.find('vff-select >>> .select__option');
    expect(option).not.toHaveClass('selected');
    await option.click();
    await page.waitForChanges();
    expect(option).toHaveClass('selected');
    await option.click();
    await page.waitForChanges();
    expect(option).not.toHaveClass('selected');
  });

  it('should reflect selected status on rendered options when value is populated by user', async () => {
    // setup
    component.setProperty('multiple', true);
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();
    // set values by updating property
    component.setProperty('value', [
      {key: 'key1', value: 'value1'},
      {key: 'key3', value: 'value3'}
    ]);
    await page.waitForChanges();
    // start: open options panel
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();
    // end: open options panel
    // do the test
    const options = await page.findAll('vff-select >>> .select__option');
    expect(options[0]).toHaveClass('selected');
    expect(options[2]).toHaveClass('selected');
  });

  it('should not emit vff:change event when user injects value with value property', async () => {
    // setup
    const vffChange = await page.spyOnEvent('vff:change');
    await component.setProperty('options', multipleOptions);
    await page.waitForChanges();
    component.setProperty('value', [
      {key: 'key1', value: 'value1'},
      {key: 'key3', value: 'value3'}
    ]);
    await page.waitForChanges();
    // do the test
    expect(vffChange).not.toHaveReceivedEvent();
  });

  it('should close options panel when user clicks outside options', async () => {
    //enable multiple
    component.setProperty('multiple', true);
    await page.waitForChanges();

    // set options
    await component.setProperty('options', singleOption);
    await page.waitForChanges();

    // open options panel
    const selectBtn = await page.find('vff-select >>> #select');
    await selectBtn.click();
    await page.waitForChanges();

    // click on any option
    const option = await page.find('vff-select >>> .select__option');
    await option.click();
    await page.waitForChanges();

    // make sure the panel is still open
    let selectItems = await page.find('vff-select >>> #select__options');
    expect(selectItems.children.length).toEqual(1);

    // click somewhere outside of the vff-select component
    await page.click('#panel-killer');
    await page.waitForChanges();

    // expect options panel to be closed now
    selectItems = await page.find('vff-select >>> #select__options');
    expect(selectItems).toBeNull();
  });

});
