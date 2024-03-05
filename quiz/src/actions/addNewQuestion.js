import axios from "../axios";
import { fetchQuestions } from "./fetchQuestions";

export const addNewQuestion = () => async (dispatch) => {
    await axios.post("/questions", { title: "", answers: [] });
    dispatch(fetchQuestions());
};
