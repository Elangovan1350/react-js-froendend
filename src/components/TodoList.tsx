import axios from "axios";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("loading...");
  const getTodoData = async () => {
    const todoData = await axios.get(
      `${import.meta.env.VITE_URL}posts/bx2u6yCzNUuLxHyyoISUsPu7WIM493LA`
    );
    setTodo(todoData.data);
    return todoData.data;
  };
  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <div>
      <h2>todo list</h2>
      <p>{JSON.stringify(todo)}</p>
    </div>
  );
};

export default TodoList;
