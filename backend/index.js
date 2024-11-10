const express = require("express");
// const compression = require('compression');
const cors = require("cors");
const { SERVER_PORT} = require("./config.js")
const {RELATION1, RELATION2, RELATION3} = require("./config.js")
const pool = require("./db.js")
const taskCardRouter = require("./routes/taskcard.js");
const tasksRouter = require("./routes/tasks.js");


const app = express();

// middlewares::
app.use(cors())
app.use(express.json())
// compress all responses
// app.use(compression());

app.use("/taskcard",taskCardRouter)
app.use("/tasks",tasksRouter)



app.listen(SERVER_PORT, () => {
    console.log(`SERVER listening on PORT_NO = ${SERVER_PORT}`);
})


app.get('/', async (req, res) => {
    try {
        const database = `CREATE IF NOT EXISTS DATABASE task-management;` ;
        const taskCardRelation = await pool.query(`CREATE TABLE IF NOT EXISTS \"${RELATION1}\"(
                    taskcard_id VARCHAR PRIMARY KEY, 
                    taskcardname VARCHAR NOT NULL UNIQUE);`);
            const tasksRelation = await pool.query(`CREATE TABLE IF NOT EXISTS \"${RELATION2}\" (
                    task_id VARCHAR PRIMARY KEY, 
                    taskname VARCHAR NOT NULL,
                    description TEXT,
                    duedate DATE,
                    taskcardname VARCHAR,
                    checkbox BOOLEAN,
                    FOREIGN KEY (taskcardname) REFERENCES \"${RELATION1}\"(taskcardname)
                );
            `);
                    
        
        return res.status(234).send("Welcome to PERN !!");        
    } catch (error) {
        // console.log(error)
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't connect to DB!!" });
    }
});