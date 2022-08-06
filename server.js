//Declare variables
const express = require(`express`)
const app = express()
const PORT = 8500;
const mongoose = require(`mongoose`);
const TodoTask = require('./models/todotask');
require('dotenv').config()


//set middleware
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION,
    {useNewURLParser: true},
    () => {console.log(`Connected to db!`)}
    )

    app.get("/", async (req, res) => {
        try {
            TodoTask.find({}, (err, tasks) => {
                res.render("./views/index.ejs", { todoTasks: tasks });
            });
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    });


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
