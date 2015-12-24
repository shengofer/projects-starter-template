'use strict';

const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const PairSchema = new Schema({
    mentee: {type: Schema.Types.ObjectId, ref: 'Person'},
    mentor: {type: Schema.Types.ObjectId, ref: 'Person'},
    mentorHistory: [{type: Schema.Types.ObjectId, ref: 'Person'}]
});

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number
    },
    program: {
        type: Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },
    programInstance: {
        type: Schema.Types.ObjectId,
        ref: 'ProgramInstance'
    },
    status: {
        type: String,
        default: 'CREATED'
    },
    mentees: [{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }],
    mentors: [{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }],
    plannedStartDate: {
        type: Date
    },
    actualStartDate: {
        type: Date
    },
    plannedEndDate: {
        type: Date
    },
    actualEndDate: {
        type: Date
    },
    pairs: [PairSchema]
}, {collection: 'groups'});

GroupSchema.plugin(deepPopulate);

module.exports = mongoose.model('Group', GroupSchema);
