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

    //get the name from the input form
    var newName = req.body.nameInput;

    //standardize the name so we can eliminate duplicates regardless of capitalization
    firstLetter = newName.charAt(0);
    firstLetter = firstLetter.toUpperCase();
    restOfName = newName.slice(1);
    restOfName = restOfName.toLowerCase();

    formattedName = firstLetter + restOfName;

    // if there are no students on the list, then add this name
    if (studentsList.length === 0) {
        studentsList = [{
            name: formattedName,
            attendanceCount: 1
        }];
    } else {

        var currentStudent = false;
        // if names on the list, loop through to see if there is a match.  If yes, add to the attendance count.  if not, add to the array.
        for (var i = 0; i < studentsList.length; i++) {

            currentName = studentsList[i]['name'];
            currentAttendanceCount = studentsList[i]['attendanceCount']

            if (currentName === formattedName) {
                studentsList[i]['attendanceCount'] = currentAttendanceCount + 1;
                currentStudent = true;
            }

        }

        if (currentStudent === false) {
            studentsList.push({
                name: formattedName,
                attendanceCount: 1
            });
        }

    }

    res.redirect('/attendance');
});

module.exports = router;
