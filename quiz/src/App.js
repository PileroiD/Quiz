import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { MainPage } from "./components/pages/main/MainPage";
import { Quiz } from "./components/pages/quiz/Quiz";
import { EditPage } from "./components/pages/edit/EditPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "./actions/fetchQuestions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions());
    }, []);

    return (
        <div className="app">
            <Header />

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/edit" element={<EditPage />} />
            </Routes>
        </div>
    );
}

export default App;
