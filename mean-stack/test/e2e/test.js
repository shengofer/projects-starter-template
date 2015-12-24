/**
 * Created by Artem_Trubitsyn on 10/19/2015.
 */

describe('Protractor', function () {
    'use strict';
    it('should have a title', function () {
        browser.get('http://localhost:8000/');
        expect(browser.getTitle()).toEqual('curator');
    });
});
