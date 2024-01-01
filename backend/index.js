require('dotenv').config();
const auth = require('./src/auth');
const profile = require('./src/profile');
const articles = require('./src/articles');
const following = require('./src/following');


const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    origin: 'https://webdevfinalfrontendbivan.surge.sh', // Replace with frontend's URL
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers)
    optionsSuccessStatus: 204, // Return a 204 status for preflight requests
  };

const app = express();

app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(cors(corsOptions));

auth(app);
articles(app);
profile(app);
following(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, async () => {
    const addr = server.address();
    console.log(`Server listening at address http://${addr.address}:${port}`)
});


