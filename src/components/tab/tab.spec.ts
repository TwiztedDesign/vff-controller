import {Tab} from './tab';

describe('vff-tab', () => {
  let tab;

  beforeEach(() => {
    tab = new Tab();
  });

  it('builds', () => {
    expect(tab).toBeTruthy();
  });

  it('should have "for" property', () => {
    expect(typeof tab.for).toBe('string');
  });
});
