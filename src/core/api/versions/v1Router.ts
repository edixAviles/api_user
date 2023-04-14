import express from 'express'
import driverRouter from '../../../modules/api/driver/driverRouter';

const v1Router = express.Router();

v1Router.use('/driver', driverRouter);
// All routes go here

export default v1Router
