import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() === '') return;
    setTodos([...todos, task]);
    setTask('');
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };
  
  const [completed, setCompleted] = useState(new Array(todos.length).fill(false));

  const handleCheckboxChange = (index) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              addTodo();
            }
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input
          type="checkbox"
          onChange={() => handleCheckboxChange(index)}
          checked={completed[index]}
          id={`todo-${index}`}/>
      <label htmlFor={`todo-${index}`}>{todo}</label>
      <button onClick={() => removeTodo(index)}>Remove</button>
    </li>
    ))}
    </ul>
    </div>
  );
}


export default App;

