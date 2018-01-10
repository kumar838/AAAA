import { hospitalityPage } from './app.po';

describe('hospitality App', function() {
  let page: hospitalityPage;

  beforeEach(() => {
    page = new hospitalityPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
