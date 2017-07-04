import express from 'express';
import sectors from './routes/sectors';

const app = express();
app.use('/sectors', sectors);

export default app;
