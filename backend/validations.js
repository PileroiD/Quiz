import { body } from "express-validator";

export const questionCreateValidation = [
    body("title", "Write a title of article").optional().isString(),
    body("answers", "Invalid answers format [array]").isArray().optional(),
];
