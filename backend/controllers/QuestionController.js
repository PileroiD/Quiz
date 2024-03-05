import QuestionModel from "../models/Question.js";

export const getAll = async (req, res) => {
    try {
        const questions = await QuestionModel.find().exec();
        res.json(questions);
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).json({
            message: "Failed to get all questions",
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const questionId = req.params.id;

        QuestionModel.findById({ _id: questionId })
            .exec()
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Question not found",
                    });
                }

                res.json(doc);
            })
            .catch((error) => {
                console.log("error :>>", error);
                return res.status(404).json({
                    message: "Failed to get question",
                });
            });
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).json({
            message: "Failed to get the question",
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = QuestionModel({
            title: req.body.title,
            answers: req.body.answers,
        });

        const question = await doc.save();

        res.json(question);
    } catch (error) {
        console.log("error :>>", error);
        res.status(500).json({
            message: "Failed to create the question",
        });
    }
};

export const remove = async (req, res) => {
    try {
        const questionId = req.params.id;

        QuestionModel.findOneAndDelete({
            _id: questionId,
        })
            .exec()
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Question not found",
                    });
                }

                res.json({
                    success: true,
                });
            })
            .catch((error) => {
                console.log("error :>>", error);
                return res.status(404).json({
                    message: "Failed to get question",
                });
            });
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).json({
            message: "Failed to delete post",
        });
    }
};

export const update = async (req, res) => {
    try {
        const questionId = req.params.id;

        QuestionModel.findOneAndUpdate(
            {
                _id: questionId,
            },
            {
                title: req.body.title,
                answers: req.body.answers,
            },
            {
                returnDocument: "after",
            }
        )
            .exec()
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Question not found",
                    });
                }

                res.json(doc);
            })
            .catch((error) => {
                console.log("error :>>", error);
                return res.status(404).json({
                    message: "Failed to get question",
                });
            });
    } catch (error) {
        console.log("error :>>", error);
        res.status(404).json({
            message: "Failed to update question",
        });
    }
};
