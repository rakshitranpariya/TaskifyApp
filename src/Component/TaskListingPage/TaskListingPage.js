import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskComponent from "./TaskComponent/TaskComponent";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const TaskListingPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.post(
          process.env.REACT_APP_API_URL + "/getTask"
        );
        const parsedTasks = response.data;
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  const backImageClick = () => {
    navigate("/login");
  };

  const handleNewTaskClick = () => {
    navigate("/newtask");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-4">Taskify</h1>
        </div>
        <div className="d-flex">
          <button className="btn btn-primary me-2" onClick={handleNewTaskClick}>
            Create new Task
          </button>
          <button className="btn btn-primary" onClick={backImageClick}>
            Logout
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="alert alert-warning border" role="alert">
          No tasks to show.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {tasks.map((task) => (
            <div key={task.id} className="col-lg-12 mb-4">
              <TaskComponent
                id={task.id}
                title={task.title}
                description={task.description}
                priorityLevel={task.priorityLevel}
                status={task.status}
                tags={task.tags}
                deadline={task.deadline}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskListingPage;
