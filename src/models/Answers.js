import mongoose, { Schema } from 'mongoose';

const Answers = new mongoose.Schema ({
    answerBody: {
        type: String,
        required: true
    },
});

export default mongoose.model('answers', Answers);
