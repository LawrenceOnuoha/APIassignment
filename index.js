const express = require("express");
const app = express();
const config = require('./config');
const Sequelize = require('sequelize');
const Student = require('./models/student');
const Section = require('./models/section');

Student.belongsTo(Section, {
    foreignKey: 'dept_id'
});

Section.hasMany(Student, {
    foreignKey: 'dept_id'
});

app.use(express.urlencoded({ extended: false })); //Global Middleware
app.use(globalMiddleware);

//Custom Middleware to track executions
let thePOST = 0;
let theGET = 0;
let thePATCH = 0;
let theDELETE = 0;

function globalMiddleware(req, res, next) {
    if (req.method === "POST") {
        thePOST +=1;
        console.log(`Post Method used ${thePOST} - HTTP Method: ${req.method}`)
    }else if (req.method === "GET") {
        theGET =+ 1;
        console.log(`GET Method used ${theGET} - HTTP Method: ${req.method}`)
    }else if (req.method === "PATCH") {
        thePATCH =+ 1;
        console.log(`PATCH Method used ${thePATCH} - HTTP Method: ${req.method}`)
    }else if (req.method === "DELETE") {
        theDELETE =+ 1;
        console.log(`DELETE Method used ${theDELETE} - HTTP Method: ${req.method}`)
    }else {
        console.log('Not a valid method');
    }

    next();
}

// Test DB connection
config.authenticate().then(() => {
    console.log('Database is connected.');
}).catch((err) => {
    console.log(err);
});


// Create a new student
app.post('/students', function (req, res){
    let studentData = req.body;

    Student.create(studentData).then((result)  => {
        res.status(200).send(result);   
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Get all students
app.get('/students', function (req, res){
    let data = {
        include: [Section]
    } 

    // res.send(students);
    Student.findAll(data).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500), send(err);
    });
});

// Filtering student records based on ID or Section
app.get('/students/filter', function (req, res) {

    let data = {
        where: {}
    };

    if(req.query.section !== undefined){
        data.where.section = req.query.section;
    }

    if(req.query.id !== undefined){
        data.where.id = req.query.id;
    }

    Student.findAll(data).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500), send(err);
    });

});

// Full student record update
// Retrieve student ID as a param.
app.put('/students/:id', function (req, res) {
    let studentId = parseInt(req.params.id);

    // Get student array index;
    let index = students.findIndex((s) => {
        return s.id === studentId;
    });

    // Update student data
    let newStudentData = req.body;
    students[index] = newStudentData;

    res.send(newStudentData);
});

// Update student's record
app.patch('/students/:id', function (req, res) {
    let studentId = parseInt(req.params.id); //ParseInt value converts strings to numbers

    // Get student using ID;
    Student.findByPk(studentId).then((result) => {
        if(result){
            //Update student
            result.nationality = req.body.nationality;

            //Save update
            result.save().then(() => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
        }else{
            //Student not found
            res.status(404).send('Student not found')
        }
    })
    .catch((err) => {
        res.status(500).send(err);
    });
});

//Delete a student record
app.delete('/students/:id', function (req, res){
    // parseint function converts a string value to integer/number.
    let studentId = parseInt(req.params.id); //ParseInt value converts strings to numbers

    // Get student using ID;
    Student.findByPk(studentId).then((result) => {
        if(result){
            //Delete student
            result.destroy().then(() => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
        }else{
            //Student not found
            res.status(404).send('Student not found')
        }
    })
    .catch((err) => {
        res.status(500).send(err);
    });
});

// Web server
app.listen(4000, (req, res) => {
    console.log('Server running on port 4000...');
});