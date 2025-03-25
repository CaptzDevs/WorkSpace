// Import the Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import functions from 'firebase-functions'
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'assets')))

// Load environment variables based on the current environment
if (process.env.NODE_ENV === 'prod') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({ path: '.env.dev' });
}

const corsOptions = {
    origin: [
    'http://localhost:5173',
    'http://172.16.0.194:5173',
    'http://172.20.10.3:5173',
    'http://172.20.10.9:5173',
    'http://192.168.137.1:5173',
    'http://172.20.10.2:5173',
    'http://192.168.1.148:5173',
    'http://192.168.0.225:5173',
    'http://192.168.0.13:5173',
    'http://172.16.1.115:5173',
    'http://169.254.18.122:5173',
    'http://172.16.1.119:5173',
    'http://172.16.2.245:5173',
    'http://192.168.110.174:5173',
    'http://192.168.1.38:5173',
    'https://registration-bhh.web.app'
], 
    credentials: true,  
};

app.use(cors(corsOptions));

import authRouter from './routes/auth.js';

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
app.set('trust proxy', true);


app.disable('x-powered-by');
/* app.use(express.json()) */
// app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

import passport from "./config/githubConfig.js";


app.use(passport.initialize());

app.use((req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (contentType.startsWith('multipart/form-data')) {
      return next(); 
    }
  
    console.log('other');

    express.urlencoded({ extended: true })(req, res, (err) => {
      if (err) {
        return res.status(400).send('Failed to parse URL-encoded body');
      }
      express.json()(req, res, next);
    });
  });

app.use((req, res, next) => {
    console.log("Running on " + process.env.NODE_ENV.toUpperCase());
    console.log("*------ Request ------");
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
        const normalizedIp = clientIp.startsWith('::ffff:') ? clientIp.substring(7) : clientIp;
        console.log("Client IP:", clientIp);
        console.log("Client normalizedIp:", normalizedIp);
        console.log(`${req.method} : ${req.url}`);
    next();
});


function listRoutes() {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push(middleware.route);
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                const route = handler.route;
                route && routes.push(route);
            });
        }
    });

    return routes;
}

app.get("/", (req, res) => {

    res.json({ 'env' : process.env.NODE_ENV ,  }).status(200);
})
  
app.get("/all", (req, res) => {

    const allRoutes = listRoutes();
    console.log('--------All Rounter---------');

    allRoutes.forEach((route) => {
        console.log(`${route.stack[0].method.toUpperCase()} - ${route.path}`);
    });

    res.json(allRoutes).status(200);
    console.log('-----------------');
})


// ------------------------------------------------------------
//  Firebase Store
// ------------------------------------------------------------

admin.initializeApp();

app.use('/auth',authRouter)


if(process.env.NODE_ENV == 'dev'){
    console.log("Running on "+process.env.NODE_ENV);
    const port = process.env.PORT || 8000;
    const server = app.listen(port, () => {
        console.log(`start at  http://localhost:${port}`)
    })
}

// chnage region to asia-southeast1
export const api = functions.https.onRequest({ region : 'asia-southeast1'} ,app); 
