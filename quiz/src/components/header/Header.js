import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = ({ className }) => {
    return (
        <div className={className}>
            <Link to="/" className="title">
                Quiz
            </Link>
        </div>
    );
};

export const Header = styled(HeaderContainer)`
    width: 100%;
    height: 50px;
    border: 1px solid black;
    box-shadow: 0 5px 4px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding: 4px 0;

    & .title {
        font-size: 30px;
        color: #000;
        text-decoration: none;
    }
`;
