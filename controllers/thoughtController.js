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


    //update a single thought by _id


    //delete a single thought by _id


    //add a new reaction to thought's reaction array


    //delete a reaction from a thought's reaction array
}