import {RadioButton} from './radio-button';

describe('vff-radio-button', () => {
  let radioButton;

  beforeEach(() => {
    radioButton = new RadioButton();
  });

  it('builds', () => {
    expect(new RadioButton()).toBeTruthy();
  });

  it('should have "name" property equals radio', () => {
    expect(radioButton.name).toEqual('radio');
  });

  it('should have "value" property equals on', () => {
    expect(radioButton.value).toEqual('on');
  });

  it('should have "checked" property equals true', () => {
    expect(radioButton.checked).toEqual(false);
  });
});
