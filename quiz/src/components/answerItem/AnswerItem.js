import { useState } from "react";
import styled from "styled-components";
import trash from "../../icons/trash.png";

const AnswerItemContainer = ({
    id,
    className,
    title,
    isSuccess,
    currentRightAnswer,
    setCurrentRightAnswer,
    deleteAnswer,
    updateAnswer,
}) => {
    const [answerValue, setAnswerValue] = useState(title);

    return (
        <div className={className}>
            <label htmlFor="answer">Ответ № {id + 1}:</label>
            <input
                className="answer-input"
                name="answer"
                type="text"
                required
                value={title}
                onChange={({ target }) => {
                    setAnswerValue(target.value);
                    updateAnswer(id, target.value);
                }}
            />
            <div className="handlers">
                <img
                    className="trashIcon"
                    src={trash}
                    alt="trash"
                    onClick={() => {
                        deleteAnswer(title);
                    }}
                />
                <input
                    type="checkbox"
                    checked={
                        !currentRightAnswer
                            ? isSuccess
                            : currentRightAnswer === answerValue
                    }
                    value={answerValue}
                    onChange={(event) => {
                        setCurrentRightAnswer(answerValue);
                        updateAnswer(id, event.target.checked);
                    }}
                />
            </div>
        </div>
    );
};

export const AnswerItem = styled(AnswerItemContainer)`
    display: flex;
    column-gap: 5px;
    height: 50px;
    align-items: center;

    & .answer-input {
        width: 300px;
        margin-bottom: 7px;
        height: 35px;
        margin: 0;
        padding: 5px;
    }

    & .trashIcon {
        width: 20px;
        cursor: pointer;
    }
`;
