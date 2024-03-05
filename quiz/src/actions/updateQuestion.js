import axios from "../axios";
import { fetchQuestions } from "./fetchQuestions";

export const updateQuestion = (id, data) => async (dispatch) => {
    await axios.patch(`/questions/${id}`, data);
    dispatch(fetchQuestions());
};
