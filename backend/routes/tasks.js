const express = require("express");
const pool = require("../db.js");
const { v4: uuidv4 } = require('uuid');
// const authenticateToken = require('../middlewares/auth.js');
require('dotenv').config();

const tasksRouter = express.Router();


tasksRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.taskname) {
            return res.status(400).json({ message: "Task-name cannot be empty !!" })
        }
        const task_id = uuidv4();
        const newTask = await pool.query("INSERT INTO tasks(task_id, taskname, description, duedate, taskcardname, checkbox) VALUES($1,$2,$3,$4,$5,$6)",
            [task_id, req.body.taskname, req.body.description, req.body.duedate, req.body.taskcardname, false]);
        // if (newTask.rowCount == 0) {
        //     res.status(500).json({ message: "Task already exists!!" });
        // }
        res.status(201).json({
            message: "New task created successfully !!",
            // data: newTask
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new Task!!" });
    }
});

// get all tasks
tasksRouter.get("/", async (req, res) => {
    try {
        const { taskname } = req.query;
        const alltasks = await pool.query(`SELECT * FROM tasks ORDER BY duedate ASC;`);

        // // Set cache-related headers
        // const max_age = 120; // 120 seconds
        // const currentDate = new Date();
        // const thirtySecondsLater = new Date(currentDate.getTime() + max_age * 1000); // 30 seconds later
        // // const lastModified = /* Calculate or retrieve the last modified date of the data */

        // res.setHeader('Cache-Control', `private, max-age=${max_age}`);
        // res.setHeader('Date', currentDate.toUTCString());
        // res.setHeader('Expires', thirtySecondsLater.toUTCString());
        // // res.setHeader('Last-Modified', lastModified.toUTCString());

        return res.status(200).json({
            message: "All tasks received !!",
            count: alltasks.rows.length,
            data: alltasks.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all tasks!!" })
    }
});


tasksRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const onetask = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [id]);
        // console.log(onetask.rows)
        if (!onetask.rows[0]) {
            return res.status(404).json({ message: "task not found !!" })
        }
        return res.status(200).json({
            message: "task received !!",
            data: onetask.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the task!!" })
    }
});


// tasksRouter.get("/:taskname", async (req, res) => {
//     try {
//         const { taskname } = req.params
//         const onetask = await pool.query("SELECT * FROM tasks WHERE taskcardname = $1", [taskname]);
//         console.log(onetask)
//         if (!onetask.rows[0]) {
//             return res.status(404).json({ message: "task not found !!" })
//         }
//         return res.status(200).json({
//             message: "task received !!",
//             data: onetask.rows
//         })
//     } catch (error) {
//         console.log("ERROR MESSAGE ::", error.message)
//         res.status(500).json({ message: "Can't get the task!!" })
//     }
// });


tasksRouter.put("/:id", async (req, res) => {
    try {
        // validating the input
        if (!req.body.taskname) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updatetask = await pool.query("UPDATE tasks SET taskname = $1, description = $2, duedate = $3, taskcardname = $4, checkbox = $5 WHERE task_id = $6;", [req.body.taskname,req.body.description,req.body.duedate,req.body.taskcardname,req.body.checkbox, id]);

        if (updatetask.rowCount == 0) {
            return res.status(404).json({ message: "task not found !!" })
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateCategory
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});


tasksRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        
        const deletetask = await pool.query("DELETE FROM tasks WHERE task_id = $1;", [id]);
        if (deletetask.rowCount == 0) {
            return res.status(404).json({ message: "task not found !!" });
        }
        console.log(deletetask);
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deletetask
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = tasksRouter;