// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Require cors library
const cors = require("cors");
// Require bodyParser library
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 80;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// routes
app.get("/getProjectData", (req, res) => {
  res.send(JSON.stringify(projectData));
});
app.post("/postProjectData", (req, res) => {
  // catch the request body and save it in the data variable
  const data = req.body;
  // create a newData object
  const newData = {
    // all properties takes values from the data variable (request body)
    temperature: data.temp,
    date: data.date,
    userResponse: data.userResponse,
  };
  // copies all projectData object properties to a newData object
  Object.assign(projectData, newData);
  res.send(projectData);
});
