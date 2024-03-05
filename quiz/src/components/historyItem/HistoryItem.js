import styled from "styled-components";
import { Scale } from "../scale/Scale";

const HistoryItemContainer = ({ className, date, time, results }) => {
    const rightAnswers = Object.keys(results).filter(
        (key) => results[key].success !== false
    ).length;

    return (
        <div className={className}>
            <div className="date-time">
                <div className="date">{date}</div>
                <div className="time">{time}</div>
            </div>
            <Scale results={results} rightAnswers={rightAnswers} />
            <div>
                Верно: {rightAnswers} / {Object.keys(results).length}
            </div>
        </div>
    );
};

export const HistoryItem = styled(HistoryItemContainer)`
    width: 1000px;
    border: 1px solid black;
    margin: 0 auto 10px auto;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .time {
        font-size: 14px;
    }
`;
