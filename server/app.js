import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import apiRouter from './api/routes.js';

//load configuration from file
config({path:'./config/.env'});

//create express server
const servApp = express();

servApp.use(express.json()); //request json body parser
servApp.use(cors()); //middleware to get rid of cors
servApp.use(morgan('dev')); //middleware for request/response monitoring
servApp.use('/api', apiRouter); //splicing the router in

//firing app the serv
servApp.listen(process.env.SERVER_PORT, () => {
    console.log(`App running on port ${process.env.SERVER_PORT}`);
});

export default servApp;