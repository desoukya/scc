// Load Environment Variables
import 'dotenv/config'
import express from 'express';
import path from 'path';
import { globby } from 'globby';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hjs');
app.use(express.static('public'));

// Parse request body in middleware before handlers
app.use(bodyParser.json());

// Allow CORS
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// create http express web server
app.listen(process.env.PORT, async () => {
  console.log('process.env.APP_ENV =>', process.env.APP_ENV);
  console.log(`Web Server Listening on port: ${process.env.PORT}`);

  // start scheduled jobs
  const jobs = await globby('scheduler/*.js');
  console.log('jobs :>> ', jobs);
  for (const job of jobs) {
    const { default: schedule } = await import(`./${job}`);
    schedule.start();
  }
  // jobs.forEach(job => require(`./${job}`).start());
});