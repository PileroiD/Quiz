import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    answers: {
        type: Array,
        default: [],
        require: true,
    },
});

const QuestionModel = mongoose.model("Question", QuestionSchema);

export default QuestionModel;
