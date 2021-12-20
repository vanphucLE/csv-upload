import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import multer from 'multer';
import expressWinston from 'express-winston';
import winston from 'winston';

import csvUpload from './csv-upload';


const app = express();

const upload = multer();

app.use(cors());

// add loggers
app.use(morgan('dev'));

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.get('/', (req, res) => {
  res.send('This is from express.js');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`);
});

app.post('/upload', upload.single('file'), csvUpload);
