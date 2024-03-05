import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../spinner/Spinner";
import { QuestionItem } from "../../questionItem/QuestionItem";
import { useState } from "react";
import { addNewQuestion } from "../../../actions/addNewQuestion";

const EditPageContainer = ({ className }) => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state?.allQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const addQuestion = () => {
        dispatch(addNewQuestion());
    };

    return (
        <div className={className}>
            {!questions ? (
                <Spinner />
            ) : (
                <>
                    {questions.map(({ title, _id, answers }, id) => (
                        <QuestionItem
                            key={_id}
                            questionIndex={id + 1}
                            _id={_id}
                            title={title}
                            answers={answers}
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                        />
                    ))}
                    <div onClick={addQuestion} className="add-q">
                        Добавить вопрос
                    </div>
                </>
            )}
        </div>
    );
};

export const EditPage = styled(EditPageContainer)`
    margin: 50px auto 0 auto;
    width: 850px;

    & .add-q {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
        text-align: center;
    }
`;
