import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MdDelete } from "react-icons/md";

import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleEditInputChange = (e) => {
    // set the new state value to what's currently in the edit input box
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  const handleUpdateTodo = (id, updatedTodo) => {
    // here we are mapping over the todos array - the idea is check if the todo.id matches the id we pass into the function
    // if the id's match, use the second parameter to pass in the updated todo object
    // otherwise just use old todo
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    // set editing to false because this function will be used inside a onSubmit function - which means the data was submited and we are no longer editing
    setIsEditing(false);
    // update the todos state with the updated todo
    setTodos(updatedItem);
  };

  // function to handle when the "Edit" button is clicked
  const handleEditClick = (todo) => {
    // set editing to true
    setIsEditing(true);
    // set the currentTodo to the todo item that was clicked
    setCurrentTodo({ ...todo });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
    // console.log(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([userInput, ...todoList]);
    setUserInput("");
  };

  const handleDelete = (todo) => {
    const updateArr = todoList.filter(
      (todoItem) => todoList.indexOf(todoItem) != todoList.indexOf(todo)
    );
    setTodoList(updateArr);
  };
  return (
    <div className={styles.todoApp}>
      <h1>What's the Plan for today?</h1>
      {isEditing ? (
        // if we are editing - display the edit todo input
        // make sure to add the handleEditFormSubmit function in the "onSubmit" prop
        <form onSubmit={handleEditFormSubmit}>
          {/* we've added an h2 element */}
          <h2>Edit Todo</h2>
          {/* also added a label for the input */}
          <label htmlFor="editTodo">Edit todo: </label>
          {/* notice that the value for the update input is set to the currentTodo state */}
          {/* also notice the handleEditInputChange is being used */}
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          {/* here we added an "update" button element - use the type="submit" on the button which will still submit the form when clicked using the handleEditFormSubmit function */}
          <button type="submit">Update</button>
          {/* here we added a "Cancel" button to set isEditing state back to false which will cancel editing mode */}
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form>
          <input
            type="text"
            placeholder="Enter a todo item"
            value={userInput}
            onChange={handleChange}
            className={styles.todoInput}
          />
          <button onClick={handleSubmit} className={styles.todoButton}>
            Add Todo
          </button>
        </form>
      )}
      <ul className={styles.todoContainer}>
        {todoList.length >= 1
          ? todoList.map((todo, idx) => {
              return (
                <li key={idx} className={styles.todoRow}>
                  {todo}
                  {/* <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(todo);
                    }}
                    className={styles.icons}
                  >
                    Delete
                  </button> */}

                  <MdDelete
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(todo);
                    }}
                    className={styles.deleteIcon}
                  />
                </li>
              );
            })
          : "Enter a todo item"}
      </ul>
    </div>
  );
};

export default Home;
