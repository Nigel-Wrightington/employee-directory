//importing the employees data from the db file
//I could not get the import to work properly. It wasn't sending the data as an array and I couldn't figure out why. My work around was just using the db data in the app.js file.
// const { employees } = require(`./db/employees`);

//importing express and creating an express app.
const express = require(`express`);
const app = express();

//this is the stand in because I couldn't get the import to work.
const employees = [
  { id: 1, name: "Carolynn McGinlay" },
  { id: 2, name: "Lodovico Filon" },
  { id: 3, name: "Jefferey Wahlberg" },
  { id: 4, name: "Kayley Tures" },
  { id: 5, name: "Rickard Carver" },
  { id: 6, name: "Michael Stryde" },
  { id: 7, name: "Averell Santino" },
  { id: 8, name: "Constantina Connue" },
  { id: 9, name: "Verile Bondesen" },
  { id: 10, name: "Gwen Grollmann" },
];

//GET / sends the string "Hello employees!".
app.get(`/`, (req, res) => {
  res.send(`Hello employees!`);
});

//GET /employees sends the array of employees.
//also send 200 status code.
app.get(`/employees`, (req, res) => {
  res.status(200).json(employees);
});

// Random employee - has to come before id
let lastRandomId = null;
app.get("/employees/random", (req, res) => {
  let randomEmployee;

  do {
    const index = Math.floor(Math.random() * employees.length);
    randomEmployee = employees[index];
  } while (employees.length > 1 && randomEmployee.id === lastRandomId);

  lastRandomId = randomEmployee.id;
  res.status(200).json(randomEmployee);
});

//GET /employees/:id sends the employee with the given id.
// This should 404 with a message if there is no employee with that id.
app.get(`/employees/:id`, (req, res) => {
  const employeeId = Number(req.params.id);
  const foundEmployee = employees.find((emp) => emp.id === employeeId);
  if (!foundEmployee) {
    return res.status(404).json({ error: `Employee not found` });
  } else {
    return res.status(200).json(foundEmployee);
  }
});

//exporting the app module, app doesnt function without this.
module.exports = app;
