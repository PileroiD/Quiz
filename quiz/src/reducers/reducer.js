const initialState = {
    allQuestions: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_QUESTIONS":
            return {
                ...state,
                allQuestions: action.payload,
            };
        default:
            return;
    }
};
