const { User, Profile } = require('./database');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const stream = require('stream')
const uploadImage = require('./image');



async function getHeadline(req, res) {
    try {
        const requestedUser = req.params.user;
        const user = await Profile.findOne({ username: requestedUser });
        if (user) {
            // If the user is not found, return an error response
            return res.send({ username: user.username, headline: user.headline });
        }
        else
            return res.status(404).send({ error: 'User not found' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function putHeadline(req, res) {
    try {
        let loggedUser = await Profile.findOne({ username: req.username });
        const newHeadline = req.body.headline;
        if (loggedUser) {
            loggedUser.headline = newHeadline;
            await loggedUser.save();
            return res.send({ username: loggedUser.username, headline: loggedUser.headline });
        }
        else
            return res.status(404).send({ error: 'User not found' });
        
    } catch (error) {
        res.status(500).send('Internal Server Error. or something');
    }
}

async function getEmail(req, res){
    try {
        const requestedUser = req.params.user;
        const user = await Profile.findOne({ username: requestedUser });
        if (user) {
            return res.send({ username: user.username, email: user.email });
        }
        else
            return res.status(404).send({ error: 'User not found' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function putEmail(req, res){
    try {
        let loggedUser = await Profile.findOne({ username: req.username });
        const newEmail = req.body.email;
        if (loggedUser) {
            loggedUser.email = newEmail;
            await loggedUser.save();
            return res.send({ username: loggedUser.username, email: loggedUser.email });
        }
        else
            return res.status(404).send({ error: 'User not found' });
        
    } catch (error) {
        res.status(500).send('Internal Server Error. or something');
    }
};


async function getZipcode(req, res){
    try {
        const requestedUser = req.params.user;
        const user = await Profile.findOne({ username: requestedUser });
        if (user) {
            return res.send({ username: user.username, zipcode: user.zipcode });
        }
        else
            return res.status(404).send({ error: 'User not found' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function putZipcode(req, res){
    try {
        let loggedUser = await Profile.findOne({ username: req.username });
        const newZipcode = req.body.zipcode;
        if (loggedUser) {
            loggedUser.zipcode = newZipcode;
            await loggedUser.save();
            return res.send({ username: loggedUser.username, zipcode: loggedUser.zipcode });
        }
        else
            return res.status(404).send({ error: 'User not found' });
        
    } catch (error) {
        res.status(500).send('Internal Server Error. or something');
    }
}



async function getPhone(req, res){
    try {
        const requestedUser = req.params.user;
        const user = await Profile.findOne({ username: requestedUser });
        if (user) {
            return res.send({ username: user.username, phone: user.phone });
        }
        else
            return res.status(404).send({ error: 'User not found' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function putPhone(req, res){
    try {
        let loggedUser = await Profile.findOne({ username: req.username });
        const newPhone = req.body.phone;
        if (loggedUser) {
            loggedUser.phone = newPhone;
            await loggedUser.save();
            return res.send({ username: loggedUser.username, phone: loggedUser.phone });
        }
        else
            return res.status(404).send({ error: 'User not found' });
        
    } catch (error) {
        res.status(500).send('Internal Server Error. or something');
    }
    
}

async function getDOB(req, res){
    try {
        const requestedUser = req.params.user;
        const user = await Profile.findOne({ username: requestedUser });
        if (user) {
            return res.send({ username: user.username, dob: user.dob });
        }
        else
            return res.status(404).send({ error: 'User not found' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

const getAvatar = async (req, res) => {
    const requestedUser = req.params.user || req.username;

    const foundProfile = await Profile.findOne({ username: requestedUser });

    if (!foundProfile) {
        return res.status(404).send({ error: 'User not found' });
    }
    return res.send({ username: requestedUser, avatar: foundProfile.avatar });
}

async function putAvatar(req, res) {
    if (!req.fileurl)
        return res.sendStatus(400);

    const requestedUser = req.username;

    const foundProfile = await Profile.findOne({ username: requestedUser });
    
    if (!foundProfile) {
        return res.status(404).send({ error: 'User not found' });
    }

    foundProfile.avatar = req.fileurl;
    await foundProfile.save();
    return res.send({ username: req.username, avatar: req.fileurl });
}

const getAllProfileInfo = async (req, res) => {
    try {
      const requestedUser = req.params.user || req.username; // Use the authenticated user if no specific user is requested
      const user = await Profile.findOne({ username: requestedUser });
      
      if (user) {
        return res.send({
          displayname: user.displayname,
          username: user.username,
          headline: user.headline,
          email: user.email,
          zipcode: user.zipcode,
          phone: user.phone,
          dob: user.dob,
          avatar: user.avatar,
          following: user.following
        });
      } else {
        return res.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  

const getDisplayname = async (req, res) => {
    const requestedUser = req.params.user || req.username;

    const foundProfile = await Profile.findOne({ username: requestedUser });

    if (!foundProfile) {
        return res.status(404).send({ error: 'User not found' });
    }
    return res.send({ username: requestedUser, displayname: foundProfile.displayname });
}

  async function putDisplayname(req, res){
    try {
        let loggedUser = await Profile.findOne({ username: req.username });
        const newDisplayname = req.body.displayname;
        if (loggedUser) {
            loggedUser.displayname = newDisplayname;
            await loggedUser.save();
            return res.send({ username: loggedUser.username, displayname: loggedUser.displayname });
        }
        else
            return res.status(404).send({ error: 'User not found' });
        
    } catch (error) {
        res.status(500).send('Internal Server Error. or something');
    }
  }

  async function getUsername(req, res){
    return res.send({username : req.username});
}






module.exports = (app) => {
    app.get('/headline/:user?', getHeadline);
    app.put('/headline', putHeadline);

    app.get('/email/:user?', getEmail);
    app.put('/email', putEmail);

    app.get('/zipcode/:user?', getZipcode);
    app.put('/zipcode', putZipcode);

    app.get('/dob/:user?', getDOB);

    app.get('/avatar/:user?', getAvatar);
    app.put('/avatar', uploadImage('image'), putAvatar);

    app.get('/phone/:user?', getPhone);
    app.put('/phone', putPhone);

    app.get('/profile/:user?', getAllProfileInfo);  

    app.get('/displayname/:user?', getDisplayname);
    app.put('/displayname', putDisplayname);

    app.get('/username', getUsername);

    
}

