import React, { useEffect, useState } from "react";
import { tasks as tasksAxios } from "./AxiosCreate";
import "./task.css";
import editIcon from "../assets/edit.jpg";
import deleteIcon from "../assets/delete.png";

const Task = () => {
    const [loading, setLoading] = useState(true);
    const [tasklist, settasklist] = useState([]);
    const [editTask, setEditTask] = useState(null);  // For tracking the task being edited
    const [formData, setFormData] = useState({
        taskname: '',
        duedate: '',
        description: '',
        taskcardname: ''
    });

    useEffect(() => {
        setLoading(true);
        tasksAxios
            .get('/')  // Make sure this is the correct endpoint
            .then((response) => {
                settasklist(response.data.data);  // Corrected this line
                setLoading(false);
            })
            .catch((error) => {
                console.log('ERROR MESSAGE ::', error);
                setLoading(false);
            });
    }, []); 

    // Handle changes in the edit form
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle the Edit button click
    const handleEditClick = (task) => {
        setEditTask(task);  // Set the task being edited
        setFormData({
            taskname: task.taskname,
            duedate: task.duedate,
            description: task.description,
            taskcardname: task.taskcardname
        });
    };

    // Handle submitting the edit form
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        
        const updatedTask = {
            taskname: formData.taskname,
            duedate: formData.duedate,
            description: formData.description,
            taskcardname: formData.taskcardname
        };

        try {
            await tasksAxios.put(`/${editTask.task_id}`, updatedTask);  // Send PUT request to update task

            // Update the tasklist locally after successful edit
            settasklist((prevTasks) => 
                prevTasks.map((task) =>
                    task.task_id === editTask.task_id
                        ? { ...task, ...updatedTask }
                        : task
                )
            );

            setEditTask(null);  // Clear the edit mode
            setFormData({ taskname: '', duedate: '', description: '' , taskcardname: '' });  // Reset form fields
        } catch (error) {
            console.log('Error updating task:', error);
        }
    };

    // Handle the Delete button click
    const handleDelete = (task_id) => {
        tasksAxios.delete(`/${task_id}`).then((response) => {
            console.log(response);
            // Remove the deleted task from the list without re-fetching
            settasklist((prevTasklist) => prevTasklist.filter(task => task.task_id !== task_id));
        }).catch((error) => {
            console.log('ERROR MESSAGE ::', error);
            setLoading(false);
        });
    };

    return (
        <div>
            
            {editTask && (
                <div className="edit-task-form">
                    <h3>Edit Task</h3>
                    <form onSubmit={handleEditSubmit}>
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
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setEditTask(null)}>Cancel</button>
                    </form>
                </div>
            )}

            {/* Task List */}
            {tasklist.map((item) => {
                return (
                    <article className='task_card' key={item.task_id}>
                        <p className='task_text'>{item.taskname}</p>
                        <div className='task_card_bottom_line'>
                            {item.description}
                            <p>{new Date(item.duedate).toLocaleDateString()}</p>
                            <div className='task_delete'>
                                
                                <button onClick={() => handleEditClick(item)}>
                                    <img src={editIcon} className='edit_icon' alt='edit' />
                                </button>
                                
                                <button onClick={() => handleDelete(item.task_id)}>
                                    <img src={deleteIcon} className='delete_icon' alt='delete' />
                                </button>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default Task;
