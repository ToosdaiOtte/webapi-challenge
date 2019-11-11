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

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

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