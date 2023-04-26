const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, done } = req.body;
    const newTask = new Task();
    newTask.title = title;
    newTask.done = done;

    await newTask.save();
    res.status(200).json({
      success: true,
      task: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) res.status(400).json({ message: 'Parameter missing...' });

  try {
    const findTask = await Task.findByIdAndUpdate({ _id: id }, req.body);

    res.status(200).json(findTask);
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) res.status(400).json({ message: 'Parameter missing...' });

  try {
    const findTask = await Task.findByIdAndDelete(id);

    res.status(200).json(findTask);
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
});

module.exports = router;