import axios from "../axios";
import { fetchQuestions } from "./fetchQuestions";

export const deleteQuestion = (id) => async (dispatch) => {
    await axios.delete(`/questions/${id}`);
    dispatch(fetchQuestions());
};
