import mongoose from 'mongoose';

const Exams = new mongoose.Schema ({
    userName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
    },
    Questions: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    score: {
        type: Number,
        min: 0,
        max: 5
    }
});

export default mongoose.model('exams', Exams);
