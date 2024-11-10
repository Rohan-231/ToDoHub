const express = require("express");
const pool = require("../db.js");
const { v4: uuidv4 } = require('uuid');
// const authenticateToken = require('../middlewares/auth.js');
require('dotenv').config();

const taskCardRouter = express.Router();


taskCardRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.taskcardname) {
            return res.status(400).json({ message: "Task-Title cannot be empty !!" })
        }
        const taskcard_id = uuidv4();
        const newTaskCard = await pool.query("INSERT INTO taskcard(taskcard_id, taskcardname) VALUES($1,$2) ON CONFLICT (taskcardname) DO NOTHING",
            [taskcard_id, req.body.taskcardname]);
        if (newTaskCard.rowCount == 0) {
            res.status(500).json({ message: "Task Card already exists!!" });
        }
        res.status(201).json({
            message: "New task Card created successfully !!",
            // data: newCategory
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new Task!!" });
    }
});

// get all tasks
taskCardRouter.get("/", async (req, res) => {
    try {
        const { taskcardname } = req.query;
        // const allCategories = await pool.query(`SELECT*FROM \"category\" ORDER BY \"categoryName\" ASC;`);
        const allTaskCards = await pool.query(`SELECT * FROM taskcard ORDER BY taskcardname ASC;`);

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
            message: "All taskcards received !!",
            count: allTaskCards.rows.length,
            data: allTaskCards.rows
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all tasks!!" })
    }
});


taskCardRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const oneTaskCard = await pool.query("SELECT * FROM taskcard WHERE taskcard_id = $1", [id]);
        // console.log(oneTaskCard.rows)
        if (!oneTaskCard.rows[0]) {
            return res.status(404).json({ message: "TaskCard not found !!" })
        }
        return res.status(200).json({
            message: "TaskCard received !!",
            data: oneTaskCard.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the TaskCard!!" })
    }
});


taskCardRouter.put("/:id", async (req, res) => {
    try {
        // validating the input
        if (!req.body.taskcardname) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateTaskcardName = await pool.query("UPDATE taskcard SET taskcardname = $1 WHERE taskcard_id = $2;", [req.body.taskcardname, id]);

        if (updateTaskcardName.rowCount == 0) {
            return res.status(404).json({ message: "TaskCard not found !!" })
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


taskCardRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        let taskcardname = await pool.query("SELECT taskcardname FROM taskcard WHERE taskcard_id = $1;", [id]);
        // console.log(taskcardname.rows[0].taskcardname);
        taskcardname = taskcardname.rows[0].taskcardname;
        const deleteTaskCardItems = await pool.query("DELETE FROM tasks WHERE taskcardname = $1;", [taskcardname]);
        // console.log(deleteTaskCardItems);
        const deleteTaskCard = await pool.query("DELETE FROM taskcard WHERE taskcard_id = $1;", [id]);
        if (deleteTaskCard.rowCount == 0) {
            return res.status(404).json({ message: "TaskCard not found !!" });
        }
        console.log(deleteTaskCard);
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteTaskCard
        })
    } catch (error) {
        console.log(error)
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = taskCardRouter;