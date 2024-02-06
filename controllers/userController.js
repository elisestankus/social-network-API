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
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    //update a single user by _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if(!user) {
                return res.status(404).json({message: 'No user found with this id!'})
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    //delete a single user by _id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId})
            if(!user) {
                return res.status(404).json({message: 'No user found with this id!'})
            }
            res.json({message: 'User deleted'})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    //add a new friend to user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
            );
            if(!user) {
                return res.status(404).json({message: 'No user found with this id!'})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //delete a friend from a user's friend list
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId}, 
                {$pull: {friends: {friendId: req.params.friendId}}},
                {new: true});
            if(!user) {
                return res.status(404).json({message: 'No user found with this id!'})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}