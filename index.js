const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

let count = 0;

function localMiddleware(req, res, next) {
    count += 1;

    console.log(count);

    next();
}

// Data
let students = [
    { id: 101, name: 'Student1 Aus', section: 'Computer Science', gpa: '3.72', nationality: 'Australian' },
    { id: 102, name: 'Student2 Braz', section: 'Music', gpa: '3.95', nationality: 'Brazilian' },
    { id: 103, name: 'Student3 Ice', section: 'History', gpa: '2.84', nationality: 'Icelander' },
    { id: 104, name: 'Student4 Ken', section: 'Web Development', gpa: '3.68', nationality: 'Kenyan' }
]

// Create a new student
app.post('/students', localMiddleware, (req, res) => {
    let newStudent = req.body;
    students.push(newStudent);
    res.send(newStudent);
});

// Get all students
app.get('/students', localMiddleware, (req, res) => {
    res.send(students);
});

// Filtering student records based on ID or Section

app.get('/students/filter', function (req, res) {
    if (req.query.id !== undefined) {
        let studId = parseInt(req.query.id); //parseInt converts a string to integer.

        // Filtering out students that correspond to specific id.
        let result = students.filter((item) => {
            return item.id == studId;
        });

        res.send(result);
    }

    if (req.query.section !== undefined) {
        let section = req.query.section;

        // Filtering out students based on section.
        let result = students.filter((item) => {
            return item.section == section;
        });

        res.send(result);
    }


});

// Full student record update
// Retrieve student ID as a param.
app.put('/students/:id', localMiddleware, function (req, res) {
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

// Update student's Section
app.patch('/students/:id', localMiddleware, function (req, res) {
    let studentId = parseInt(req.params.id);

    // Get student array index;
    let index = students.findIndex((s) => {
        return s.id == studentId;
    });

    students[index].section = req.body.section; //Update Section

    res.send(students[index]);

});

app.delete('/students/:id', localMiddleware, (req, res) => {
    // parseint function converts a string value to integer.
    let studentId = parseInt(req.params.id);

    // Get student array index
    let index = students.findIndex((s) => {
        return s.id === studentId;
    });

    // Delete student record
    students.splice(index, 1);

    res.send('Deletion Successful');
});

// Web server
app.listen(3000, (req, res) => {
    console.log('Server running on port 3000...');
});