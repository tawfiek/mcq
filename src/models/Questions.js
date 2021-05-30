import mongoose, { Schema } from 'mongoose';

const Questions = new mongoose.Schema ({
    questionBody: {
        type: String,
        required:true
    },
    options: {
        type: [Schema.Types.ObjectId],
        required:true,
        minlength: 2,
        maxlength: 4,
    },
    correctAnswerID: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

export default mongoose.model('questions', Questions);
