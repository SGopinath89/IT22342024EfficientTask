import "./Todolist.css"
import React from "react"
import CheckIcon from "@mui/icons-material/Check"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"

function Todolist(props) {
  const taskComplete = async (task) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/tasks/${task._id}`,
        {
          todo: task.todo,
          isComplete: !task.isComplete,
        }
      )
      props.taskComplete(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const removeTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/tasks/${id}`)
      props.removeTask(res.data) // Assuming removeTask updates state or performs necessary actions
    } catch (err) {
      console.log(err)
    }
  }

  const openEditPopup = (task) => {
    props.tasktoUpdate(task)
    props.showPopup()
  }

  const todolist = props.todolist.map((task, index) => (
    <li key={index}>
      <div style={{ display: "flex" }}>
        <CheckIcon className={task.isComplete ? "isComplete" : "checkicon"} />
        <p
          className={task.isComplete ? "taskcomplete" : ""}
          onClick={() => taskComplete(task)}
        >
          {task.todo}
        </p>
      </div>
      <div>
        <EditIcon className="edit" onClick={() => openEditPopup(task)} />
        <CloseIcon className="close" onClick={() => removeTask(task._id)} />
      </div>
    </li>
  ));

  return (
    <div className="tasklist">
      <ul>{todolist}</ul>
    </div>
  );
}

export default Todolist
