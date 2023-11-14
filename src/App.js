import React, { useState } from 'react';
import './App.css';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './Draggable.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { task: task, completed: false }]);
    setTask('');
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDrop = (event) => {
    console.log("yep");
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
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <button className="add-button" onClick={addTodo}>Add</button>
      </div>
      <DndContext onDragEnd={handleDrop}>
        <ul>
          {todos.map((todo, index) => (
              <li>
                <div className="todo-container">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      checked={todo.completed}
                      id={`todo-${index}`}
                    />
                    <Draggable key={todo}>
                      <label htmlFor={`todo-${index}`} className={`todo-label ${todo.completed ? 'completed' : ''}`}>
                        {todo.task}
                      </label>
                    </Draggable>
                    <button className="remove-button" onClick={() => removeTodo(index)}>Remove</button>
                </div>
              </li>
          ))}
        </ul>
        <div className="extra-container">
          <p>..</p>
              </div>
      </DndContext>
    </div>
  );
}

export default App;