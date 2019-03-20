const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
});

server.get('/api/cohorts/:id', async (req, res) => {
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

server.get('/api/cohorts/:id/students', async (req, res) => {
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

server.post('/api/cohorts', async (req, res) => {
  try {
    await db('cohorts').insert(req.body);
    res.status(201).json({message: "Cohort added!"})
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
});

server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const updatedCohort = await db('cohorts').where({ id: req.params.id }).update(req.body);
    res.status(201).json(updatedCohort);
  } catch (e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
});

server.delete('/api/cohorts/:id', async (req, res) => {
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
})

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});