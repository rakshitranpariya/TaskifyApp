import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const TaskComponent = ({
  id: initialId,
  title: initialTitle,
  description: initialDescription,
  priorityLevel: initialPriorityLevel,
  deadline: initialDeadline,
  status: initialStatus,
  tags: initialTags,
}) => {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(initialId);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priorityLevel, setPriorityLevel] = useState(initialPriorityLevel);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [status, setStatus] = useState(initialStatus);
  const [tags, setTags] = useState(initialTags || []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    console.log(deadline);
    const Items = {
      id: id,
      title: title,
      description: description,
      priorityLevel: priorityLevel,
      deadline: deadline,
      status: status,
      tags: tags,
    };
    console.log(Items);
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/addTask",
      Items
    );
    setEditMode(false);
  };
  const handleDeleteClick = async () => {
    const Item = {
      task_id: id,
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/deleteTask",
        Item
      );

      // You may want to check the response and handle it accordingly

      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };
  const handleAddTagClick = () => {
    const newTagValue = document.getElementById("newTag").value;
    let flag = 1;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === newTagValue) {
        flag = 0;
      }
    }
    if (flag === 1) {
      setTags((tags) => [...tags, document.getElementById("newTag").value]);
    } else {
      console.log("Tag already exists");
    }
  };

  const handleDeleteTagClick = () => {
    const deleteTagValue = document.getElementById("newTag").value;
    const filteredList = tags.filter((item) => item !== deleteTagValue);
    setTags(filteredList);
  };

  return (
    <div
      className={`list-group-item w-100${editMode ? "d-flex" : ""}`}
      style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}
    >
      {editMode ? (
        <div>
          <div className="mb-1 d-flex w-100 justify-content-between">
            <div className="me-2" style={{ width: "36%" }}>
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="me-2" style={{ width: "10%" }}>
              <label className="form-label">Priority:</label>
              <select
                className="form-control"
                value={priorityLevel}
                onChange={(e) => setPriorityLevel(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="me-2">
              <label className="form-label">Deadline:</label>
              <input
                type="date"
                className="form-control"
                placeholder="Deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="me-2">
              <label className="form-label">Status:</label>
              <select
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="me-2 " style={{ width: "30%" }}>
              <label className="form-label">Tags:</label>
              <div className="d-flex flex-wrap">
                {tags.map((tag, index) => (
                  <span key={index} className="badge bg-secondary me-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
              <input
                id="newTag"
                type="text"
                className="form-control me-2"
                placeholder="Add a new tag"
              />
              <button
                className="btn btn-primary btn-sm me-2 mt-2"
                onClick={handleAddTagClick}
              >
                Add Tag
              </button>
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={handleDeleteTagClick}
              >
                Delete Tag
              </button>
            </div>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary mt-2" onClick={handleSaveClick}>
              Save Task
            </button>
            <button
              className="btn btn-secondary mt-2 ms-2"
              onClick={handleDeleteClick}
            >
              Delete Task
            </button>
            <button
              className="btn btn-secondary mt-2 ms-2"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex w-100 justify-content-between">
          <div className="col-md-3" style={{ width: "40%" }}>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <div className="col-md-2" style={{ width: "10%" }}>
            <p className="m-0">
              <strong>Priority:</strong>
            </p>
            <p className="card-text">{priorityLevel}</p>
          </div>
          <div className="col-md-2" style={{ width: "10%" }}>
            <p className="m-0">
              <strong>Deadline:</strong>
            </p>
            <p className="card-text">{deadline}</p>
          </div>
          <div className="col-md-2">
            <p className="m-0">
              <strong>Status:</strong>
            </p>
            <p className="card-text">{status}</p>
          </div>

          <div className="col-md-2">
            <p className="m-0">
              <strong>Tags:</strong>
            </p>
            <div className=" flex-wrap">
              {tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="col-md-1 mt-2">
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

TaskComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priorityLevel: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
};

export default TaskComponent;
