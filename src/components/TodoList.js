import React from 'react';

export default function TodoList({
  todo,
  handleCheck,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="input-group mb-2">
      <button className="input-group-text">
        <input
          onChange={() => handleCheck(todo.id)}
          type="checkbox"
          name=""
          id=""
          className="form-check-input mt-0"
          checked={todo.checked}
        />
      </button>
      <input
        onChange={e => handleEdit(todo.id, e.target.value)}
        type="text"
        value={todo.name}
        className="form-control"
      />
      <button
        onClick={() => handleDelete(todo.id)}
        className="btn btn-outline-danger"
      >
        Delete
      </button>
    </div>
  );
}
