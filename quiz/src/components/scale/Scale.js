import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
`;

const Cell = styled.div`
    width: 20px;
    height: 12px;
    border: 1px solid black;

    ${({ backgroundcolor }) =>
        backgroundcolor === "green"
            ? "background-color: green;"
            : "background-color: red;"}
`;

const ScaleContainer = ({ className, results }) => {
    const resKeys = Object.keys(results);

    return (
        <div className={className}>
            <div className="startValue">0</div>
            <Wrapper>
                {resKeys.map((key) => {
                    return results[key].success ? (
                        <Cell key={key} backgroundcolor="green" />
                    ) : (
                        <Cell key={key} backgroundcolor="red" />
                    );
                })}
            </Wrapper>
            <div className="endValue">{resKeys.length}</div>
        </div>
    );
};

export const Scale = styled(ScaleContainer)`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;
