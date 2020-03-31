import {Tab} from './tab';

describe('vff-tab', () => {
  let tab;

  beforeEach(() => {
    tab = new Tab();
  });

  it('builds', () => {
    expect(tab).toBeTruthy();
  });
});
