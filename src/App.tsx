import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-center gap-6 text-indigo-600 font-medium">
        <Link to="/">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/todos">Todos</Link>
      </nav>

      {/* Page Routes */}
      <Routes>
        {/* 👇 Default route (home) */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Navigate to="/" replace />} />{" "}
        {/* redirect /signin to home */}
        <Route path="/todos" element={<TodoList />} />
        {/* fallback for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
