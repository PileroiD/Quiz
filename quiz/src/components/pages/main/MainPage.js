import styled from "styled-components";
import { Link } from "react-router-dom";

import { Buttons, Button } from "../../buttons/Buttons";
import { useEffect, useState } from "react";
import { HistoryItem } from "../../historyItem/HistoryItem";
import Spinner from "../../spinner/Spinner";

const MainPageContainer = ({ className }) => {
    const [historyItems, setHistoryItems] = useState([]);

    useEffect(() => {
        setHistoryItems([]);
        const amountOfResults = +localStorage.getItem("history-number") || null;

        if (amountOfResults) {
            let newHistoryItems = [...historyItems];

            for (let i = 1; i <= amountOfResults - 1; i++) {
                const item = JSON.parse(localStorage.getItem("results" + i));
                newHistoryItems.push(item);
            }

            setHistoryItems(newHistoryItems);
        }
    }, []);

    return (
        <div className={className}>
            <Buttons>
                <Link to="/quiz">
                    <Button>Запустить тест</Button>
                </Link>
                <Link to="/edit">
                    <Button>Редактровать тест</Button>
                </Link>
            </Buttons>

            {!historyItems.length ? (
                <div className="no-data">No data</div>
            ) : (
                <div className="history">
                    <div className="history-title">История прохождений: </div>
                    {!historyItems ? (
                        <Spinner />
                    ) : (
                        historyItems
                            .reverse()
                            .map((item, id) => (
                                <HistoryItem
                                    key={id}
                                    date={item.date}
                                    time={item.time}
                                    results={item.result}
                                />
                            ))
                    )}
                    <div
                        className="clear-history"
                        onClick={() => {
                            localStorage.clear();
                            setHistoryItems([]);
                        }}
                    >
                        Очистить историю
                    </div>
                </div>
            )}
        </div>
    );
};

export const MainPage = styled(MainPageContainer)`
    margin: 0 auto;

    & .history-title {
        text-align: center;
        margin-bottom: 20px;
    }

    & .no-data {
        text-align: center;
        font-size: 40px;
        color: gray;
        margin-top: 170px;
    }

    & .clear-history {
        text-align: center;
        text-decoration: underline;
        cursor: pointer;
    }
`;
