import { KoldataPage } from './app.po';

describe('koldata App', function() {
  let page: KoldataPage;

  beforeEach(() => {
    page = new KoldataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
