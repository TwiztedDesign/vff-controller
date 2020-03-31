import {Tabs} from './tabs';

describe('vff-tabs', () => {
  let tabs = new Tabs();

  it('builds', () => {
    expect(tabs).toBeTruthy();
  });

  it('class should have a default property', () => {
    expect(typeof tabs.default).toBe('string');
  });
});
