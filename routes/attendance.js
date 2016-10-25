const express = require('express');
const router = express.Router();

var studentsList = [];

router.get('/', function(req, res, next) {

    numberOfStudents = studentsList.length;
    res.render('index.ejs', {
        page_title: "Attendance App",
        students: studentsList,
        numberOfStudents: numberOfStudents
    });
});


router.post('/', function(req, res, next) {
    const newName = req.body.nameInput;

    if (studentsList.length === 0) {
        studentsList = [{
            name: newName,
            attendanceCount: 1
        }];
    } else {

        var currentStudent = false;

        for (var i = 0; i < studentsList.length; i++) {

            currentName = studentsList[i]['name'];
            currentAttendanceCount = studentsList[i]['attendanceCount']

            if (currentName === newName) {
                studentsList[i]['attendanceCount'] = currentAttendanceCount + 1;
                currentStudent = true;
            }

        }

        if (currentStudent === false) {
            studentsList.push({
                name: newName,
                attendanceCount: 1
            });
        }

    }

    res.redirect('/attendance');
});

module.exports = router;
