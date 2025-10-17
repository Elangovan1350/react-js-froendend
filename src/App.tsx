import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import AddTodo from "./components/AddTodo";

function App() {
  return (
    <Router>
      {/* navbar */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        {/* 👇 Default route (home) */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Navigate to="/" replace />} />{" "}
        {/* redirect /signin to home */}
        <Route path="/todos" element={<TodoList />} />
        <Route path="/addtodo" element={<AddTodo />} />
        {/* fallback for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
