'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Person = mongoose.model('Person');

/**
 * Globals
 */
let person;

/**
 * Unit tests
 */
describe('Person Model', function () {
    beforeEach(function () {
        person = new Person({
            name: 'test name',
            email: 'test email',
            availableAs: ['mentor']
        });
    });

    describe('Method Save', function () {
        it('should begin with no persons', function (done) {
            Person.find({}, function (err, persons) {
                expect(persons.length).toBe(0);
                done();
            });
        });
        it('should be able to save without problems', function (done) {
            person.save(function (err) {
                expect(err).toBeNull();
                Person.find({}, function (error, groups) {
                    expect(groups.length).toBe(1);
                    done();
                });
            });
        });
        it('should be able to save without problems when avalianleAs undefined', function (done) {
            person.avaliableAs = undefined;
            person.save(function (err) {
                expect(err).toBeNull();
                Person.find({}, function (error, groups) {
                    expect(groups.length).toBe(1);
                    done();
                });
            });
        });
        it('should throw error if no required fields', function (done) {
            person.name = undefined;
            person.save(function (err) {
                expect(err).not.toBeNull();
                done();
            });
        });
    });

    afterEach(function (done) {
        Person.remove().exec();
        done();
    });
});
