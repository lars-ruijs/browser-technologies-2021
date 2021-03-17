import express from 'express';
import { router } from './routes/router.js';

// Create a express app
const app = express();
const port = process.env.PORT || 4000;

// Set static file directory
// Source: https://expressjs.com/en/starter/static-files.html
app
    .set('view engine', 'ejs')
    .use(express.static('public'))
    .use('/', router)
    .listen(port);