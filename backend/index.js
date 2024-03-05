import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import * as QuestionController from "./controllers/QuestionController.js";
import { questionCreateValidation } from "./validations.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

dotenv.config();
const db = process.env.DATABASE_ACCESS;

mongoose
    .connect(db)
    .then(() => {
        console.log("DB ok");
    })
    .catch((error) => {
        console.log(`DB error: ${error}`);
    });

const app = express();

app.use(express.json());
app.use(cors());

app.get("/questions", QuestionController.getAll);
app.get("/questions/:id", QuestionController.getOne);
app.post(
    "/questions",
    questionCreateValidation,
    handleValidationErrors,
    QuestionController.create
);
app.delete("/questions/:id", QuestionController.remove);
app.patch(
    "/questions/:id",
    questionCreateValidation,
    handleValidationErrors,
    QuestionController.update
);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK");
});
