'use strict';

const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    availableAs: {
        type: Array,
        default: []
    },
    groupActivity: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }]
}, {collection: 'people'});

PersonSchema.plugin(deepPopulate);

module.exports = mongoose.model('Person', PersonSchema);
