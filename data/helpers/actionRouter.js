const express = require('express');

const Actions = require('./actionModel.js');

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

router.get('/:id', (req, res) => {

});

router.post('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});



module.exports = router;