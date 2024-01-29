import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import backImage from "../../Assets/Images/backsymbol.png";
import "./MakeNewTask.css";
import axios from "axios";
const { v4: uuidv4 } = require("uuid");

const MakeNewTask = () => {
  let idCounter = 1;
  const navigate = useNavigate();
  const [task, setTask] = useState({
    id: "1",
    title: "",
    description: "",
    priorityLevel: "",
    deadline: "",
    status: "",
    tags: [],
  });

  const handleChange = (e) => {
    // console.log("taskone--------", e.target);
    const name = e.target.name;
    const value = e.target.value;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const tagsInput = e.target.value;
    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
    setTask((prevTask) => ({ ...prevTask, tags: tagsArray }));
    console.log("===========", task);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    task.id = uuidv4();

    console.log("idcounter", idCounter);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/addTask",
        task
      );
      console.log("Response:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
    // You can handle the submission logic here.
    // call the lambda to store the data todynamo db

    console.log("Task Submitted:", task);
    navigate("/tasklist");
  };
  const backImageClick = () => {
    navigate("/tasklist");
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-lg-6">
        <img
          src={backImage}
          alt=""
          onClick={backImageClick}
          className="small-image"
          style={{ maxWidth: "50px", maxHeight: "50px" }}
        />
        <h1 className="ms-5 ps-4 mb-4">Add New Task</h1>
        <form onSubmit={handleSubmit} className="ms-5 ps-4">
          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
            </div>
            <div className="col-md-9">
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="priorityLevel" className="form-label">
                Priority Level:
              </label>
            </div>
            <div className="col-md-9">
              <select
                id="priorityLevel"
                name="priorityLevel"
                value={task.priorityLevel}
                onChange={handleChange}
                className="form-select"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="deadline" className="form-label">
                Deadline:
              </label>
            </div>
            <div className="col-md-9">
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={task.deadline}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="status" className="form-label">
                Status:
              </label>
            </div>
            <div className="col-md-9">
              <select
                id="status"
                name="status"
                value={task.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="tags" className="form-label">
                Tags:
              </label>
            </div>
            <div className="col-md-9">
              <input
                type="text"
                id="tags"
                name="tags"
                value={task.tags.join(", ")}
                onChange={handleTagsChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeNewTask;
