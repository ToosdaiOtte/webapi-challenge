const express = require('express');
const Projects = require('./projectModel');
const projectsRouter = express.Router();

projectsRouter.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving projects'
        })
    })
})

projectsRouter.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
})

function validateProjectId(req, res, next){
    const {id} = req.params;

    Projects.get(id)
    .then(project => {
        if(project){
            req.project = project;
            next()
        } else {
            res.status(404).json({
                message: 'Project Id does not exist'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving project',
            err
        })
    })
}

module.exports = projectsRouter;