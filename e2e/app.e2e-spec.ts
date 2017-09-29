import { AppPage } from './app.po';

describe('src App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Budget of Ukraine 2017: expenses');
  });
});
