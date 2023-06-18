const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ej_Dgreat_05',
    database: 'attendance_checker'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM attendance_db";
    db.query(sqlGet, (error, result) => {
        res.send(result)
    })
})

app.post("/api/post", (req, res) => {
    const {studentIDN, studentName, studentSection, studentContact} = req.body
    const sqlInsert = "INSERT INTO attendance_db (studentIDN, studentName, studentSection, studentContact) VALUES (?,?,?,?)";
    db.query(sqlInsert, [studentIDN, studentName, studentSection, studentContact], (error, result) => {
        if(error){
            console.log(error)
        }
    })
})

app.delete("/api/remove/:number", (req, res) => {
    const { number } = req.params
    const sqlRemove = "DELETE FROM attendance_db WHERE number=?";
    db.query(sqlRemove, number, (error, result) => {
        if(error){
            console.log(error)
        }
    })
})

app.get('/api/get/:number', (req, res) => {
    const { number } = req.params
    const sqlGet = "SELECT * FROM attendance_db WHERE number=?";
    db.query(sqlGet, number, (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.put('/api/update/:number', (req, res) => {
    const { number } = req.params;
    const { studentIDN, studentName, studentSection, studentContact } = req.body;
    const sqlUpdate = "UPDATE attendance_db SET studentIDN=?, studentName=?, studentSection=?, studentContact=? WHERE number=?";
    
    db.query(sqlUpdate, [studentIDN, studentName, studentSection, studentContact, number], (error, result) => {
      if (error) {
        console.log(error);
        // You may also send an error response to the client
        res.status(500).json({ error: 'An error occurred' });
        return;
      }
      
      res.send(result);
    });
  });
  

app.get("/", (req, res) => {
    // const sqlInsert = 
    //     "INSERT INTO attendance_db (studentIDN, studentName, studentSection, studentContact) VALUES ('21-1233', 'Edmar Jan', 'BSCS 2-1', 'ej44444@gmail.com')";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error)
    //     console.log("result", result)
    //     res.send("Hello Express")
    // })

})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})