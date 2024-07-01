import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Addtask from './components/Addtask';
import Todolist from './components/Todolist';
import Updatetask from './components/updatetask';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [todolist, setTodolist] = useState([]);
  const [tasktoUpdate, setTasktoUpdate] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get('http://localhost:8000/api/tasks')
        .then(res => {
          setTodolist(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [isAuth]);

  const addTask = newTask => {
    setTodolist([...todolist, newTask]);
  };

  const taskComplete = task => {
    const newList = [...todolist];
    newList.forEach(item => {
      if (item._id === task._id) {
        item.isComplete = task.isComplete;
      }
    });
    setTodolist(newList);
  };

  const removeTask = task => {
    const newList = todolist.filter(item => !(item._id === task._id));
    setTodolist(newList);
  };

  const updatetask = task => {
    const newList = [...todolist];
    newList.forEach(item => {
      if (item._id === task._id) {
        item.todo = task.todo;
      }
    });
    setTodolist(newList);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
        <Route path="/register" element={<Register setAuth={setIsAuth} />} />
        <Route
          path="/"
          element={isAuth ? (
            <>
              <Addtask addTask={addTask} />
              <Todolist
                todolist={todolist}
                taskComplete={taskComplete}
                removeTask={removeTask}
                tasktoUpdate={task => setTasktoUpdate(task)}
                showPopup={() => setShowPopup(!showPopup)}
              />
              {showPopup && (
                <Updatetask
                  task={tasktoUpdate}
                  updatetask={updatetask}
                  removePopup={() => setShowPopup(!showPopup)}
                />
              )}
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
