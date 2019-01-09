/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /**
     * Suite to test RSS feeds
     */
    describe('RSS Feeds', function() {
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });
      /**
       * Loop over all of the feeds
       */
      allFeeds.forEach(feed => {
        /**
         * Test that the feeds have a URL defined
         */
        it('feed has a URL defined and is not empty', () => {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe('');
        });
        /**
         * Test that the feeds have a name defined
         */
        it('feed has a name defined and is not empty', () => {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe('');
        });
      });
    });
    /**
     * Suite to test the menu
     */
    describe('The menu', () => {
      /**
       * Test that the menu is hidden by default
       */
      it('should be hidden by default', () => {
        expect(document.body).toHaveClass('menu-hidden');
      });
      /**
       *  Test that the menu toggles when the icon is clicked.
       */
      it('should show/hide when the menu icon is clicked', () => {
        var el = document.querySelector('.menu-icon-link');
        el.click();
        expect(document.body).not.toHaveClass('menu-hidden');
        el.click();
        expect(document.body).toHaveClass('menu-hidden');
      });
    });
    /**
     * Suite to test the initial entries of the feed
     */
    describe('Initial Entries', () => {
      /**
       * This one is asyncronous, so run beforeEach()
       */
      beforeEach(done => {
        loadFeed(0, done);
      });
      /**
       * Ensure that at least 1 feed is loaded.
       */
      it('has at least 1 entry in feed container', done => {
        const feedEls = document.querySelectorAll('.feed .entry');
        expect(feedEls.length).toBeGreaterThan(0);
        done();
      });
    });
    /**
     * Suite to test what happens when a new feed is selected.
     */
    describe('New Feed Selection', () => {
      let oldFeed;
      beforeEach(done => {
        loadFeed(0, () => {
          oldFeed = document.querySelector('.feed').innerHTML;
          loadFeed(1, done);
        });
      });
      it('should change content when a new feed is loaded', done => {
        expect(document.querySelector('.feed').innerHTML).not.toEqual(oldFeed);
        done();
      });
    });
  })()
);
