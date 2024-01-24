const express = require("express");
var cors = require('cors')
const connection = require("../src/db/conn");

// Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json())
app.use(cors())

// inserting user
app.post("/insert", async (req, res) => {
    var user = req.body;
    user.Password = await bcrypt.hash(String(user.Password), saltRounds)
    user.ConfirmPassword = user.Password;

    connection.query("INSERT INTO users SET ? ", user,
        function (error) {
            if(error){
                res.status(409).send({message: error.sqlMessage})
                return;
            }
            res.send({ message: "Register Successfully." });
            return;
        });
})


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})