import React, { useState } from "react";
import { tasks as tasksAxios } from "./AxiosCreate"; // Your Axios instance
import "./task.css";

const CheckBox = (props) => {
    const { data } = props; 
    const [isChecked, setIsChecked] = useState(data.checkbox || false); 

    const handleCheckboxChange = async () => {
        try {
            const updatedTask = {
                taskname: data.taskname,         
                duedate: data.duedate,           
                description: data.description,   
                taskcardname: data.taskcardname, 
                checkbox: !isChecked,
            };

            const response = await tasksAxios.put(`/${data.task_id}`, updatedTask);

            if (response.data) {
                setIsChecked(!isChecked);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
        </div>
    );
};

export default CheckBox;