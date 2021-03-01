import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes';
import { AppError } from './errors/AppError';

createConnection();
const app = express();

//faz o express compreender requests do tipo json
app.use(express.json());

//chama as toas criadas
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`,
    });
})

export {app}