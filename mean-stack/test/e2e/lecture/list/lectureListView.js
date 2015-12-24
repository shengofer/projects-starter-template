describe('lectureListView', function () {
    'use strict';
    it('should navigate to add new program form', function () {
        browser.get('#/lectures');
        element(by.css('.md-fab')).click();
        expect(browser.getCurrentUrl()).toContain('/editLecture');
    });
});
