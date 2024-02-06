const { User, Thought } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },

    //get a single user by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
            .populate('thoughts')
            .populate('friends');

            if(!user) {
                return res.status(404).json({message: 'No user found with this id'})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //create a new user


    //update a single user by _id


    //delete a single user by _id

    
    //add a new friend to user's friend list


    //delete a friend from a user's friend list
}