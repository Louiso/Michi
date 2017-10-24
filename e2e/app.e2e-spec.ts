import { MichiPage } from './app.po';

describe('michi App', () => {
  let page: MichiPage;

  beforeEach(() => {
    page = new MichiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
