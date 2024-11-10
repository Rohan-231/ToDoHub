import React, { useState } from "react";
import { tasks as tasksAxios } from "./AxiosCreate"; // Import axios instance
import "./addtask.css"; // CSS for styling

const Addtask = (props) => {
  const [formData, setFormData] = useState({
    taskname: "",
    duedate: "",
    description: "",
    taskcardname: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();

    // Ensure the form has required data
    if (!formData.taskname || !formData.duedate || !formData.taskcardname) {
      alert("Please fill all the required fields!");
      return;
    }

    try {
      // Sending POST request to backend to add the task
      const response = await tasksAxios.post("/", formData);
      console.log("New task added:", response.data);

      // Immediately add the newly added task to the list
      props.setTaskList((prevTasks) => [...prevTasks, response.data]);

      // Reset the form and hide it
      setFormData({
        taskname: "",
        duedate: "",
        description: "",
        taskcardname: "",
      });
      setIsFormVisible(false); // Hide the form after submission
    } catch (error) {
      console.error("Error adding task:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      {/* Add Task Button */}
      {!isFormVisible ? (
        <button
          className="add-task-btn"
          onClick={() => setIsFormVisible(true)}
        >
          Add Task
        </button>
      ) : (
        <div className="add-task-form">
          <h3>Add New Task</h3>
          <form onSubmit={handleAddTask}>
            <div>
              <label>Task Name</label>
              <input
                type="text"
                name="taskname"
                value={formData.taskname}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label>Due Date</label>
              <input
                type="date"
                name="duedate"
                value={formData.duedate}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Task Card Name</label>
              <input
                type="text"
                name="taskcardname"
                value={formData.taskcardname}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit">Add Task</button>
              <button type="button" onClick={() => setIsFormVisible(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Addtask;