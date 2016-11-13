import { ATipprPage } from './app.po';

describe('a-tippr App', function() {
  let page: ATipprPage;

  beforeEach(() => {
    page = new ATipprPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
