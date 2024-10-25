import express from 'express';
import cors from 'cors';

import superheroRouter from './routes/superheroes';
import mongo from './middleware/mongo';
import unknownEndpoint from './middleware/unknownEndpoint';
import bodyParser from 'body-parser';

mongo.connectToMongoDB();

const app = express();
app.use(bodyParser.json());

app.use(cors<express.Request>());
// app.use(express.static("dist"));
app.use(express.json());

app.use('/api/superheroes', superheroRouter);

app.use(unknownEndpoint);

export default app;
