import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./App.css";
import MessagesPage from "./pages/MessagesPage";
import MessageDetailPage from "./pages/MessageDetailPage";
import NewsPage from "./pages/NewsPage";
import AddNewsPage from "./pages/AddNewsPage";
import EditNewsPage from "./pages/EditNewsPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && (
        <nav className="admin-nav">
          <div className="nav-left">
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
          </div>
          <div className="nav-right">
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </nav>
      )}
      
      <main>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/messages" replace /> : <LoginPage />
          } />
          
          <Route path="/messages" element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          } />
          
          <Route path="/messages/:id" element={
            <ProtectedRoute>
              <MessageDetailPage />
            </ProtectedRoute>
          } />
          
          <Route path="/news" element={
            <ProtectedRoute>
              <NewsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/news/add" element={
            <ProtectedRoute>
              <AddNewsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/news/edit/:id" element={
            <ProtectedRoute>
              <EditNewsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/messages" replace />} />
          <Route path="*" element={<Navigate to="/messages" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
