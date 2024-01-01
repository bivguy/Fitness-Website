const md5 = require('md5');
const { User, Profile } = require('./database');

const secret = process.env.SECRET || Date.now().toString();

let sessionUser = {};

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    // Send an error if the username or password is not provided
    if (!password || !username) {
        return res.status(400).send('Username or Password not provided');
    }
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            // Send a 401 Unauthorized status and message
            return res.send({error: '400'});
        }
        const hash = md5(user.salt + password);
        if (hash !== user.hash) {
            // Send a 401 Unauthorized status and message
            return res.send({error: '400'});
        }
        const sessionID = md5(secret + Date.now().toString() + hash);
        sessionUser[sessionID] = username;
        // Set a cookie and send a success response
        res.cookie('sessionID', sessionID, { maxAge: 3600 * 1000, httpOnly: true, sameSite: 'None', secure: true });
        res.send({ username: username, result: 'success' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

function logout(req, res) {
    delete sessionUser[req.cookies['sessionID']];
    return res.sendStatus(200);
}


async function register(req, res) {
    try {
        // Checking for login validation/verification
        const { displayname, username, password, email, dob, phone, zipcode } = req.body;
        if (!username || !password || !email || !dob || !phone || !zipcode) {
            return res.status(400).send('All fields are required');
        }
  
        // Check if the username is already taken
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.send({error: 'username taken'});
        }

        if (!displayname){
            displayname = username;
        }

        // Generate hash and salt for password
        const salt = md5(secret + username + email);
        const hash = md5(salt + password);

        // Create a new user
        const newUser = new User({
            username: username,
            hash: hash,
            salt: salt,
            date: new Date()
        });
        await newUser.save();

        // Create a new profile
        const newProfile = new Profile({
            displayname: displayname,
            username: username,
            headline: 'This is a random headline',
            email: email,
            zipcode: zipcode,
            phone: phone,
            dob: dob,
            avatar:
            "https://res.cloudinary.com/dtwgz016f/image/upload/v1701407733/asjxh8xi0ugdxnnzfpw0.jpg",
            following: []
        });

        await newProfile.save();

        // Set sessionID 
        const sessionID = md5(secret + Date.now().toString() + hash);
        sessionUser[sessionID] = username;
        res.cookie('sessionID', sessionID, { maxAge: 3600 * 1000, httpOnly: true, sameSite: 'None', secure: true });
        return res.send({ username: username, result: 'success' });
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}


async function changePassword(req, res) {
   try {
    let loggedUser = await User.findOne({ username: req.username });
    let loggedProfile = await Profile.findOne({ username: req.username });
    const newPassword = req.body.password;

    if (loggedUser) {
        // Generate hash and salt for password
        const salt = md5(secret + req.username + loggedProfile.email);
        const hash = md5(salt + newPassword);

        loggedUser.salt = salt;
        loggedUser.hash = hash;

        await loggedUser.save();

        await loggedUser.save();
        return res.send({ username: loggedUser.username, result: 'success'});
    }
    else
        return res.status(404).send({ error: 'User not found' });
    
    } catch (error) {
        res.status(500).send('Internal Server Error. or something');
    }
}



function isLoggedIn(req, res, next) {
    //This is checking if you are logged in or not
    if (!req.cookies) {
        return res.sendStatus(401);
    }
    const sessionID = req.cookies['sessionID'];

    const username = sessionUser[sessionID];
    if (username) {
        req.username = username;
        return next();
    }
    else {
        return res.sendStatus(401);
    }
}


module.exports = (app) => {
    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);
    app.put('/logout', logout);
    app.put('/password', changePassword);
}