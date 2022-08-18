import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todo, settodo] = useState([]);
  const [render, setRender] = useState(true);
  useEffect(() => {
    if (render) {
      setRender(false);
      return;
    }
    const todoStr = JSON.stringify(todo);
    localStorage.setItem("todo", todoStr);
  }, [todo]);
  useEffect(() => {
    const todoStr = localStorage.getItem("todo");
    if (!todoStr) settodo([]);
    else settodo(JSON.parse(todoStr));
  }, []);
  const addtodo = (title, completed) => {
    settodo([{ title: title, completed: completed }, ...todo]);
  };

  const deleteTodo = (idx) => {
    todo.splice(idx, 1);
    settodo([...todo]);
  };

  const markTodo = (idx) => {
    todo[idx].completed = !todo[idx].completed;
    settodo([...todo]);
  };

  const moveUp = (idx) => {
    if (idx == 0) return;
    let temp = todo[idx];
    todo[idx] = todo[idx - 1];
    todo[idx - 1] = temp;
    settodo([...todo]);
  };

  const moveDown = (idx) => {
    if (idx == todo.length - 1) return;
    let temp = todo[idx];
    todo[idx] = todo[idx + 1];
    todo[idx + 1] = temp;
    settodo([...todo]);
  };

  const Input = (event) => {
    if (event.key == "Enter") {
      if (event.target.value === "") {
        alert("Todo cannot be empty");
        return;
      }
      addtodo(event.target.value, false);
      event.target.value = "";
    }
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onKeyUp={Input}
        />
        {todo.map((elem, index) => (
          <Todo
            key={index}
            title={elem.title}
            completed={elem.completed}
            mark={() => markTodo(index)}
            deleteTd={() => deleteTodo(index)}
            moveUp={() => moveUp(index)}
            moveDown={() => moveDown(index)}
          />
        ))}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todo.length}) </span>
          <span className="text-warning">
            Pending ({todo.filter((things) => things.completed == false).length}
            ){" "}
          </span>
          <span className="text-success">
            Completed (
            {todo.filter((things) => things.completed == true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Thian Suwannakul 620610176
        </p>
      </div>
    </div>
  );
}
