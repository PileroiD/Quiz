import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Question } from "./Question";
import Spinner from "../../spinner/Spinner";

const QuizContainer = ({ className }) => {
    const questions = useSelector((state) => state.allQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    return (
        <div className={className}>
            {!questions ? (
                <Spinner />
            ) : (
                <Question
                    id={questions[currentQuestion]?._id}
                    title={questions[currentQuestion]?.title}
                    answers={questions[currentQuestion]?.answers}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    questionsLength={questions.length}
                />
            )}
        </div>
    );
};

export const Quiz = styled(QuizContainer)``;
