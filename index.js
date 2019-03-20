const express = require('express');
const helmet = require('helmet');
const CohortsRouter = require('./cohorts/cohorts-router.js');

const server = express();

server.use(helmet());
server.use('/api/cohorts', CohortsRouter);


const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});