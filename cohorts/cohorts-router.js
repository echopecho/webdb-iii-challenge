const express = require('express');
const knex = require('knex');
const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

const router = express.Router();
router.use(express.json());


router.get('/', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await db('cohorts').where({ id: id }).first();
    if(cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(400).json({message: "That ID does not exist."})
    }
    
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
});

router.get('/:id/students', async (req, res) => {
  const { id } = req.params;

  try{
    const cohort = await db('cohorts').where({ id: id }).first();
    if(cohort) {
      const students = await db('students').where({ cohort_id: id })
      res.status(200).json(students);
    } else {
      res.status(404).json({message: "That ID does not exist."})
    }
    
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
});

router.post('/', async (req, res) => {
  try {
    await db('cohorts').insert(req.body);
    res.status(201).json({message: "Cohort added!"})
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCohort = await db('cohorts').where({ id: req.params.id }).update(req.body);
    res.status(201).json(updatedCohort);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts').where({ id: req.params.id }).first();
    if(cohort) {
      await db('cohorts').where({ id: req.params.id }).del();
      res.status(201).json({message: "That cohort was deleted"});
    } else {
      res.status(404).json({message: "That cohort was not found"});
    }
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server"});
  }
});

module.exports = router;