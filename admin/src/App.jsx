import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import MessagesPage from "./pages/MessagesPage";
import NewsPage from "./pages/NewsPage";
import AddNewsPage from "./pages/AddNewsPage";

function App() {
  return (
    <div className="App">
      <nav className="admin-nav">
        <NavLink
          to="/messages"
          className={({ isActive }) => (isActive ? "active" : "")}>
          Messages
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) => (isActive ? "active" : "")}>
          News
        </NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/add" element={<AddNewsPage />} />
          <Route path="*" element={<MessagesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
