import React, { useState } from 'react';
import './App.css';
import { DndContext, closestCenter} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable} from '@dnd-kit/sortable';
import { Droppable } from './Droppable.js';
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

  return (
    <DndContext collisionDetection={closestCenter}>
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
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <ul>
            {todos.map((todo, index) => (
              <useSortable key={index} id={index}>
                <Droppable>
                  <li>
                    <div className="todo-container">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(index)}
                        checked={todo.completed}
                        id={`todo-${index}`}
                      />
                      <Draggable>
                      <label
                        htmlFor={`todo-${index}`}
                        className={`todo-label ${
                          todo.completed ? 'completed' : ''}`}>
                        {todo.task}
                      </label>
                      </Draggable>
                      <button
                        className="remove-button"
                        onClick={() => removeTodo(index)}>
                        Remove
                      </button>
                    </div>
                  </li>
                </Droppable>
              </useSortable>
            ))}
          </ul>
        </SortableContext>
        <Droppable>
        <div className="extra-container">
          <p>..</p>
              </div>
              </Droppable>
              </div>
      </DndContext>

  );
}

export default App;