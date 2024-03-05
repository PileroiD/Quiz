import axios from "../axios";

export const fetchQuestions = () => async (dispatch) => {
    const { data } = await axios.get("/questions");

    dispatch({ type: "SET_QUESTIONS", payload: data });

    return data;
};
