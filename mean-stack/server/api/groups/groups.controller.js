'use strict';

const path = require('path');
const Group = require('./group.model');
const GroupService = require('./groups.service');
const ProgramInstancesService = require('../programInstances/programInstance.service');
const ProgramService = require('../programs/program.service');
const BaseController = require(path.resolve('./server/shared/base.controller'));
const RESPONSES = require(path.resolve('./server/shared/responses/responses.status'));

const GROUP_STATUS_IN_STAFFING = 'IN STAFFING';

function _createProgramInstance(program) {
    return ProgramInstancesService.saveProgramInstance(program);
}

function _updateGroupWithProgramInstance(group, programIns) {
    group.programInstance = programIns._id;
    group.status = GROUP_STATUS_IN_STAFFING;
    return GroupService.saveGroup(group);
}

function _getProgramByGroup(group) {
    let programId = group.programId;
    return ProgramService.getFullProgramById(programId)
        .then(_createProgramInstance.bind(this))
        .then(_updateGroupWithProgramInstance.bind(this, group));
}

function _getFullProgramById(programId) {
    return ProgramService.getProgramByID(programId);
}

function _sendStartStaffingResponse(res, group) {
    return res.status(RESPONSES.STATUS.OK).json({
        status: 'success',
        responses: group
    });
}

function _sendError(res, err) {
    return res.status(RESPONSES.STATUS.NOT_FOUND).json({
        error: err
    });
}

class GroupController extends BaseController {
    constructor() {
        super(Group);
    }

    addNewGroup(req, res) {
        let groupObject = req.body;
        let programInstance = _getFullProgramById(groupObject.program._id)
            .then(_createProgramInstance);
        let groupNumber = this.getModel().count();
        Promise
            .all([programInstance, groupNumber])
            .then((results) => {
                groupObject.programInstance = results[0]._id;
                groupObject.program = groupObject.program._id;
                groupObject.number = results[1];
                const modelInstance = this.getModelInstance(groupObject);
                return modelInstance.save();
            })
            .then((group) => {
                res.status(RESPONSES.STATUS.CREATED).json({
                    status: 'success',
                    response: group
                });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    get(req, res) {
        GroupService.get(req, res);
    }

    getById(req, res) {
        let groupId = req.params.id;
        GroupService.getGroupByID(groupId)
            .then((result) => {
                res.status(RESPONSES.STATUS.OK).json(result);
            })
            .catch(_sendError.bind(this, res));
    }

    updateGroup(req, res) {
        let groupId = req.params.id;
        let paramsToUpdateGroup = req.body;
        const model = this.getModel();
        model.update({ '_id': groupId }, { $set: paramsToUpdateGroup })
            .then((result) => {
                res.status(RESPONSES.STATUS.OK).json({
                    status: 'success',
                    response: result
                });
            })
            .catch((err) => {
                res.status(RESPONSES.STATUS.NOT_FOUND).json(err);
            });
    }

    startStaffing(req, res) {
        let groupId = req.params.id;
        GroupService.getGroupByID(groupId)
            .then(_getProgramByGroup.bind(this))
            .then(_sendStartStaffingResponse.bind(this, res))
            .catch(_sendError.bind(this, res));
    }
}
module.exports = GroupController;
