import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import commoditiesRoute from './routes/commoditiesRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow ALL origins with default of cors(*)
app.use(cors());
// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:2000',
//         methods: ['GET,', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/commodities', commoditiesRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });