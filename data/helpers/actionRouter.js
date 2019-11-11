const express = require('express');

const Actions = require('./actionModel.js');
const Projects = require('./projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving actions',
            err
        })
    })
});

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
});

router.post('/:id', validateActionId, (req, res) => {
    const actionInfo = {...req.body, project_id: req.params.id};

    if(!actionInfo.description || !actionInfo.notes){
        res.status(400).json({
            message: 'Please add description and notes'
        })
    } else {
        Actions.insert(actionInfo)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error creating action',
                err
            })
        })
    }
});

router.put('/:id', validateActionId, (req, res) => {
    const updatedAction = {...req.body, project_id: req.params.id};
    const id = req.params.id;

    if(!updatedAction.description && !updatedAction.notes){
        res.status(400).json({
            message: 'Please enter description or notes to update'
        })
    } else {
    Actions.update(id, updatedAction)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error updating action',
            err
        })
    })        
    }

});

router.delete('/:id', validateActionId, (req, res) => {
    const id = req.params.id;

    Actions.remove(id)
    .then(action => {
        res.status(200).json({
            message: 'Action removed'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error deleted action',
            err
        })
    })
});

function validateActionId(req, res, next){
    const id = req.params.id;
    
    Actions.get(id)
    .then(action => {
        if(action){
            req.action = action;
            next()
        } else {
            res.status(404).json({
                message: 'ID does not exist'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving actions from id',
            err
        })
    })
};

module.exports = router;