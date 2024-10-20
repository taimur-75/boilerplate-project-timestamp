// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API for date handling
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  
  // Handle empty date parameter (current date)
  let date;
  if (!dateString) {                                     // If date is is not provided,
    date = new Date();                                   // assign current date to the variable.
  } else {                                                                                       // Else -
    // If the dateString is a number (timestamp), convert it to integer
    if (!isNaN(dateString)) {                            // If it is a Unix Timestamp or number,
      dateString = parseInt(dateString);                 // convert it to int.
    }
    date = new Date(dateString);                         // Then assign it to the variable.
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {              // If the 'date.toString()' returns "Invalid Date",
    res.json({ error: "Invalid Date" });                 // respond the json object.
  } else {                                                                              // Else -
    res.json({                                           // send response as required.
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
