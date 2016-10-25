// dependencies from npm (package.json)
const express = require('express');
const path = require('path');
const ejs = require('ejs');

// Initialize our app
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('assets'));
app.set('views', path.join(__dirname, 'files'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const attendanceRoutes = require('./routes/attendance');

// Set our routes
app.use('/attendance', attendanceRoutes);
app.use('/*', function(req, res, next) {
  res.redirect('/attendance');
});

// Set up our server
const port = 3000;
app.listen(port, () => console.log(`Server listening on: ${port}`));
