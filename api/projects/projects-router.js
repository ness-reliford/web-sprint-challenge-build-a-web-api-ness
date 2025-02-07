// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error getting projects'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (!project) {
            res.status(404).json({ 
                message: 'Project not found' 
            });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Error getting project' 
        });
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.description) {
            return res.status(400).json({ 
                message: 'Name and description are required' 
            });
        }
        const project = await Projects.insert(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error adding project' 
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || req.body.completed == undefined) {
            return res.status(400).json({ 
                message: 'Name and description are required' 
            });
        }
        const project = await Projects.update(req.params.id, req.body);
        if (!project) {
            res.status(404).json({ 
                message: 'Project not found' 
            });
        } else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating project' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const project = await Projects.remove(req.params.id);
        if (!project) {
            return res.status(404).json({ 
                message: 'Project not found' 
            });
        } else {
            return res.status(200).json(project);
        }
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error deleting project' 
        });
    }
});

router.get('/:id/actions', async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        if (!actions) {
            return res.status(404).json({ 
                message: 'Actions not found' 
            });
        } else {
            return res.status(200).json(actions);
        }
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error getting actions' 
        });
    }
});






module.exports = router;