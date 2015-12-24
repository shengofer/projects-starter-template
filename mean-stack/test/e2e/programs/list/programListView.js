xdescribe('programListView', function () {
    'use strict';
    it('should navigate to add new program form', function () {
        browser.get('#/');
        element(by.css('.floating-button')).click();
        expect(browser.getCurrentUrl()).toContain('/addprogram');
    });
});
