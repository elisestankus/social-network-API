const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //get a single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId});
            if(!thought) {
                return res.status(404).json({message: 'No thought found with this id!'});
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: thought._id}},
                {new: true}
            );
            if(!user) {
                return res.status(404).json({message: 'Thought created, but no user found with this id'})
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //update a single thought by _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true} 
            )

            if(!thought) {
                return res.status(404).json({message: 'No thought found with this id!'})
            }

            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },

    //delete a single thought by _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId})
            if(!thought) {
                return res.status(404).json({message: 'No thought found with this id!'})
            }
            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            );
            if(!user) {
                return res.status(404).json({message: 'Thought deleted but not removed from user thought array'})
            }
            res.json({message: 'Thought deleted'})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    //add a new reaction to thought's reaction array


    //delete a reaction from a thought's reaction array
}