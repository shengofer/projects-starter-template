'use strict';

const path = require('path');
const Group = require('./group.model');
const RESPONSES = require(path.resolve('./server/shared/responses/responses.status'));

exports.getGroupByID = function (id) {
    return Group.findById(id)
        .deepPopulate(
                    `mentees
                     mentors
                     program
                     programInstance
                     programInstance.modules
                     programInstance.modules.lectures
                     programInstance.modules.lectureInstances`
        )
        .exec();
};

exports.saveGroup = function (group) {
    return group.save();
};

exports.get = function (req, res) {
    let limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;
    let skip = req.query.page ? parseInt(req.query.page, 10) * limit : 0;
    if (!req.query.speciality) {
        return Group.find().skip(skip).limit(limit).populate('program')
            .then((result) => {
                res.status(RESPONSES.STATUS.OK).json({
                    status: 'success',
                    responses: result
                });
            })
            .catch((err) => {
                res.status(RESPONSES.STATUS.NOT_FOUND).json(err);
            });
    }
    return Group.find()
        .populate('program')
        .then((result) => {
            let resArray = [];
            result.some((group)=>{
                if (group.program.speciality === req.query.speciality) {
                    if (skip === 0) {
                        resArray.push(group);
                        limit--;
                    } else {
                        skip--;
                    }
                }
                if (limit === 0) {
                    return true;
                }
            });

            res.status(RESPONSES.STATUS.OK).json({
                status: 'success',
                responses: resArray
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(RESPONSES.STATUS.NOT_FOUND).json(err);
        });
};
