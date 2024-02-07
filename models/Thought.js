const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // add getter to format
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
            toJSON: {
                virtuals: true,
        }
    },
)

//creating a new instance of the thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;