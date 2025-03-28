import bodyParser from 'body-parser';
import express from 'express';
import emailRoute from './routes/emailRoute.js';
import { userEvents } from './services/rabbitServiceListener.js';

const app = express();

app.use(bodyParser.json());
app.use('/api/email', emailRoute);

userEvents().catch((err) => {
    console.error('Error al conectar con RabbitMQ', err);
});

export default app;