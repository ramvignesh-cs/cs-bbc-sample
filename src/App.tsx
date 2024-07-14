import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import News from "./pages/News/news";
import NavBar from "./components/NavBar/navBar";
import NewsDetails from "./pages/NewsDetails/newsDetails";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to={"/news"} />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/articles/:article_id" element={<NewsDetails />} />
      </Routes>
    </div>
  );
}

export default App;
