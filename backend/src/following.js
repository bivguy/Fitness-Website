const { User, Profile } = require('./database');


//Get a list of users being followed by the requested user
const getUsers = async (req, res) => {
    const requestedUser = req.params.user || req.username;
    const foundProfile = await Profile.findOne({username : requestedUser});
    if (!foundProfile) {
        // If the user is not found, return an error response
        console.log("there's an error, user name is " + requestedUser);
        return res.status(404).send({ error: 'User not found' });
    }

    return res.send({ username: requestedUser, following: foundProfile.following });
}


//Add :user to the following list for the logged in user
const putUsers = async (req, res) => {
    try {
        let loggedUser = await Profile.findOne({ username: req.username });
        const userToFollow = req.params.user;

        if (!loggedUser) {
            // If the logged-in user is not found, return an error response
            return res.send({ error: 'Logged-in user not found' });
        }

        const userToFollowProfile = await Profile.findOne({ username: userToFollow });
        if (!userToFollowProfile) {
            return res.send({ error: 'User to follow not found' });
        }

        let followingList = loggedUser.following || [];

        if (!followingList.includes(userToFollow)) {
            followingList.push(userToFollow);
        }

        loggedUser.following = followingList;
        await loggedUser.save();
        
        return res.send({ username: loggedUser.username, following: followingList });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};



// delete :user in the following list for the logged in user
const deleteUsers = async (req, res) => {
    try {
        const userToDelete = req.params.user;
        let loggedUser = await Profile.findOne({ username: req.username });

        if (!loggedUser) {
            // If the logged-in user is not found, return an error response
            return res.status(404).send({ error: 'Logged-in user not found' });
        }

        let foundProfile = loggedUser.following.find((following) => following === userToDelete);

        if (!foundProfile) {
            // If the user to delete is not found in the following list, return an error response
            return res.status(404).send({ error: 'User to delete not found in the following list' });
        }

        let filteredFollowing = loggedUser.following.filter((name) => name !== userToDelete);
        loggedUser.following = filteredFollowing;

        await loggedUser.save();

        return res.send({ username: loggedUser.username, following: filteredFollowing });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};


module.exports = (app) => {
    app.get('/following/:user?', getUsers);
    app.put('/following/:user', putUsers);
    app.delete('/following/:user', deleteUsers);
} 