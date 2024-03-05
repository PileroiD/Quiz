import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Buttons } from "../../buttons/Buttons";
import { getCurrentDate } from "../../utils/getCurrentDate";
import { getCurrentTime } from "../../utils/getCurrentTime";

const Wrapper = styled.div`
    display: flex;
    margin-top: 100px;
    flex-direction: column;

    & .current-question {
        text-align: center;
    }

    & .question {
        text-align: center;
        width: 600px;
        margin: 10px auto 0 auto;
        font-size: 20px;
    }
`;

const Button = styled.button`
    width: 250px;
    height: 50px;
    font-size: 18px;

    ${({ disabled }) => (disabled ? "cursor: auto" : "cursor: pointer")}
`;

const AnswerItem = styled.div`
    width: 600px;
    margin: 10px auto 0 auto;
    min-height: 30px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 5px;
`;

const QuestionContainer = ({
    id,
    className,
    title,
    answers,
    currentQuestion,
    setCurrentQuestion,
    questionsLength,
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState({});

    const isLastPage = currentQuestion === questionsLength - 1;
    const isAllAnswered = Object.keys(result).length === questionsLength;

    const updateResult = (answerId) => {
        setResult((prevResult) => ({
            ...prevResult,
            [id]: answers[answerId],
        }));
    };

    const nextButtonDisable = () => {
        if (selectedAnswer && !isLastPage) {
            return false;
        }
        return true;
    };

    const handleFinish = () => {
        const historyObject = {
            date: getCurrentDate(),
            time: getCurrentTime(),
            result,
        };

        let historyNumber = parseInt(
            localStorage.getItem("history-number") || "1"
        );
        localStorage.setItem("history-number", historyNumber + 1);

        localStorage.setItem(
            "results" + historyNumber,
            JSON.stringify(historyObject)
        );
    };

    return (
        <div className={className}>
            <Wrapper>
                <div className="current-question">
                    {currentQuestion + 1}/{questionsLength}
                </div>
                <div className="question">{title}</div>
                <div className="answers">
                    {answers
                        ? answers.map((item, id) => (
                              <AnswerItem key={id}>
                                  <input
                                      type="radio"
                                      value={item.title}
                                      checked={selectedAnswer === item.title}
                                      onChange={({ target }) => {
                                          setSelectedAnswer(target.value);
                                          updateResult(id);
                                      }}
                                  />
                                  {item.title}
                              </AnswerItem>
                          ))
                        : null}
                </div>
            </Wrapper>

            {isLastPage && isAllAnswered ? (
                <Link to="/" className="finish-test" onClick={handleFinish}>
                    Закончить тест
                </Link>
            ) : null}

            <Buttons>
                <Button
                    disabled={currentQuestion === 0}
                    onClick={() => {
                        setCurrentQuestion(currentQuestion - 1);
                        delete result[id];
                    }}
                >
                    Предыдущий вопрос
                </Button>
                <Button
                    disabled={nextButtonDisable()}
                    onClick={() => {
                        setCurrentQuestion(currentQuestion + 1);
                        setSelectedAnswer(null);
                    }}
                >
                    Следующий вопрос
                </Button>
            </Buttons>
        </div>
    );
};

export const Question = styled(QuestionContainer)`
    & .finish-test {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        color: green;
    }
`;
