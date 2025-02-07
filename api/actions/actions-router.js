// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')

router.get('/', async (req, res) => {
    try{
        const actions = await Actions.get();
        res.status(200).json(actions)
    } catch (error) {
        res.status(500).json({ 
            message: "Error getting actions"
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (!action) {
            return res.status(404).json({ 
                message: 'Action not found' 
            });
        } else {
            res.status(200).json(action);
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Error getting action' 
        });
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.project_id || !req.body.description || !req.body.notes) {
            return res.status(400).json({ 
                message: 'Project ID, description, and notes are required' 
            });
        }
        const action = await Actions.insert(req.body);
        res.status(201).json(action);
    } catch (error) {
        res.status(500).json({ message: 'Error adding action' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.project_id || !req.body.description || !req.body.notes || req.body.completed == undefined) {
            return res.status(400).json({ message: 'Project ID, description, and notes are required' });
        }
        const action = await Actions.update(req.params.id, req.body);
        if (!action) {
            return res.status(404).json({ message: 'Action not found' });
        } else {
            res.status(200).json(action);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating action' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const action = await Actions.remove(req.params.id);
        if (!action) {
            return res.status(404).json({ message: 'Action not found' });
        } else {
            res.status(200).json(action);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting action' });
    }
});

module.exports = router;