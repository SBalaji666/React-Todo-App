import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import Logo from '../asset/logo.svg';

const todoss = [
  {
    id: 1,
    name: 'Task one',
    checked: false,
  },
  {
    id: 2,
    name: 'Task Two',
    checked: false,
  },
  {
    id: 3,
    name: 'Completed todo',
    checked: true,
  },
];

const newTodo = name => {
  return {
    id: Date.now(),
    name: name,
    checked: false,
  };
};

function App() {
  const [todos, setTodos] = useState(todoss);
  const [name, setName] = useState('');
  const LOCAL_STORAGE_KEY = 'todos';

  useEffect(() => {
    const todosJson = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (todosJson) setTodos(todosJson);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));

    return () => {
      localStorage.clear(LOCAL_STORAGE_KEY);
    };
  }, [todos]);

  const handleInput = input => {
    setName(input);
  };

  const handleCheck = id => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const handleDelete = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) return;
    const todo = newTodo(name);
    setTodos(prev => [...prev, todo]);
    setName('');
  };

  const handleEdit = (id, value) => {
    console.log(id, value);
    if (!value.length) {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    if (value.length) {
      setTodos(prev =>
        prev.map(todo => {
          if (todo.id === id) {
            return { ...todo, name: value };
          }
          return todo;
        })
      );
    }
  };

  return (
    <div className="container mx-auto">
      <div className="col-12 col-md-6 mx-auto">
        <div className="mt-3">
          <img
            src={Logo}
            alt=""
            className="img-fluid mx-auto d-block"
            width={100}
          />

          <h3 className="heading text-center pt-3">ToDo List</h3>
        </div>

        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="d-flex">
            <input
              type="text"
              name=""
              id=""
              value={name}
              placeholder="Add To Do"
              className="form-control"
              onChange={e => handleInput(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary bg-gradient ms-2"
              disabled={!name}
            >
              Add
            </button>
          </div>
        </form>

        <div className="mb-3 ">
          <p className="text-muted mb-2 title">Pending</p>
          {todos.map(todo => {
            if (!todo.checked) {
              return (
                <TodoList
                  key={todo.id}
                  todo={todo}
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            } else {
              return '';
            }
          })}
        </div>

        <div className="pb-5">
          <p className="text-muted mb-2 title">Completed</p>
          {todos.map(todo => {
            if (todo.checked) {
              return (
                <TodoList
                  key={todo.id}
                  todo={todo}
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            } else {
              return '';
            }
          })}
        </div>
      </div>

      <footer>
        &copy; Copyright 2022
        <a className="ms-2" href="#">
          ToDo React App
        </a>
      </footer>
    </div>
  );
}

export default App;
