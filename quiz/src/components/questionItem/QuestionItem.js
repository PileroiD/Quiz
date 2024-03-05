import styled from "styled-components";
import arrowDown from "../../icons/arrow-down.png";
import arrowUp from "../../icons/arrow-up.png";
import { useState } from "react";
import { AnswerItem } from "../answerItem/AnswerItem";
import trash from "../../icons/trash.png";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../actions/deleteQuestion";
import { updateQuestion } from "../../actions/updateQuestion";

const Wrapper = styled.div`
    position: relative;

    & .delete-q {
        width: 20px;
        position: absolute;
        right: -30px;
        top: 10px;
        cursor: pointer;
    }
`;

const QuestionItemContainer = ({
    className,
    questionIndex,
    title,
    _id,
    answers,
    currentQuestion,
    setCurrentQuestion,
}) => {
    const [titleValue, setTitleValue] = useState(title);
    const [currentRightAnswer, setCurrentRightAnswer] = useState(null);
    const [allAnswers, setAnswers] = useState(answers);

    const dispatch = useDispatch();

    const deleteAnswer = (answerTitle) => {
        const newAnswers = allAnswers.filter(
            (item) => item.title !== answerTitle
        );

        setAnswers(newAnswers);
    };

    const save = () => {
        const data = {
            title: titleValue,
            answers: allAnswers,
        };

        dispatch(updateQuestion(_id, data));
    };

    const deleteQuestionItem = () => {
        dispatch(deleteQuestion(_id));
    };

    const addAnswer = () => {
        setAnswers((prev) => [...prev, { title: "", success: false }]);
    };

    const updateAnswer = (id, value) => {
        const newAnswers = allAnswers.map((answer, index) => {
            if (index === id) {
                if (typeof value === "boolean") {
                    return { ...answer, success: value };
                }

                return { ...answer, title: value };
            }

            return { ...answer, success: false };
        });

        setAnswers(newAnswers);
    };

    return (
        <Wrapper>
            <div className={className}>
                <div className="wrapper">
                    <div className="item-number">Вопрос №{questionIndex}</div>

                    {_id !== currentQuestion ? (
                        <img
                            src={arrowDown}
                            alt="arrow-down"
                            className="arrow"
                            onClick={() => setCurrentQuestion(_id)}
                        />
                    ) : (
                        <div className="opened-item">
                            <img
                                src={arrowUp}
                                alt="arrow-up"
                                className="arrow"
                                onClick={() => setCurrentQuestion(null)}
                            />
                            <label htmlFor="title">Вопрос: </label>
                            <input
                                className="title-input"
                                name="title"
                                type="text"
                                required
                                value={titleValue}
                                onChange={({ target }) =>
                                    setTitleValue(target.value)
                                }
                            />

                            <div className="answers-wrapper">
                                {allAnswers.map((item, answerIndex) => (
                                    <AnswerItem
                                        id={answerIndex}
                                        key={answerIndex}
                                        title={item.title}
                                        isSuccess={item.success}
                                        currentRightAnswer={currentRightAnswer}
                                        setCurrentRightAnswer={
                                            setCurrentRightAnswer
                                        }
                                        deleteAnswer={deleteAnswer}
                                        updateAnswer={updateAnswer}
                                    />
                                ))}
                            </div>

                            <div onClick={addAnswer} className="add-answer">
                                Добавить ответ
                            </div>
                            <div onClick={save} className="save">
                                Сохранить
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <img
                onClick={deleteQuestionItem}
                className="delete-q"
                src={trash}
                alt="trash"
            />
        </Wrapper>
    );
};

export const QuestionItem = styled(QuestionItemContainer)`
    border: 1px solid #00cfff;
    padding: 10px;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 7px;
    margin-bottom: 10px;
    position: relative;

    & .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        width: 20px;
        cursor: pointer;
    }

    & .title-input {
        width: 500px;
        min-height: 30px;
        padding: 5px;
        margin: 10px 0;
    }

    & .answers-wrapper {
        display: flex;
        flex-direction: column;
    }

    & .add-answer {
        text-decoration: underline;
        color: green;
        cursor: pointer;
    }

    & .save {
        text-decoration: underline;
        text-align: center;
        color: blue;
        cursor: pointer;
    }
`;
