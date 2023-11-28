/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan'; // Show routes called in console during development
import path from 'path';
import helmet from 'helmet';//Agrega cabeceras a las llamdas http por seguridad
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from './routes/api';
import Paths from './routes/constants/Paths';

import EnvVars from './constants/EnvVars';
import HttpStatusCodes from './constants/HttpStatusCodes';

import { RouteError } from './other/classes';

enum NodeEnvs {
  Dev = 'development',
  Test = 'test',
  Production = 'production'
}

// **** Variables **** //

const app = express();


// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter.apiRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});


// ** Front-End Content ** //

// Set views directory (html)
const viewsDir = path.join(__dirname, 'public/views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  return res.redirect('/key');
});

// Redirect to login if not logged in.
app.get('/users', (_: Request, res: Response) => {
  return res.sendFile('test.html', { root: viewsDir });
});

app.get('/key', (_: Request, res: Response) => {
  return res.sendFile('test.html', { root: viewsDir })
})


// **** Export default **** //

export default app;
