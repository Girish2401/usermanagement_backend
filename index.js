const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const _ = require("lodash");
const Employee = require("./employee");
const Visitor = require("./visitors");
const path = require('path');


const port = 3000;

const allowedDomains = ["http://localhost:4200", "https://site-usermanagement-frontend.onrender.com"];

const corsOptions = {
  origin: allowedDomains,
  methods: ["GET", "PUT", "POST", "DELETE"],
  optionsSuccessStatus: 200,
};
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200).json({});
});

app.post("/employee", async (req, res) => {
  let employee = new Employee({ ...req.body });
  await employee.save();
  res.send(req.body);
});

app.get("/employees", async (req, res) => {
  let employees = await Employee.find({});
  res.send(employees);
});

app.get("/employee/:id", async (req, res) => {
  console.log(req.params.id);
  let employee = await Employee.find({ cid: req.params.id });
  res.send(employee);
});

app.put("/employee/:id", async (req, res) => {
  console.log(req.body);
  let employee = req.body;
  let employeeRecord = await Employee.findOneAndUpdate(
    { cid: employee.cid },
    employee,
    {
      upsert: true,
      new: true,
    }
  );
  res.send(employeeRecord);
});

app.post("/visitor/add", async (req, res) => {
  let visitor = new Visitor({ ...req.body });
  let employee = await Employee.find({ cid: req.body.employee_id });
  visitor.employee_name = employee[0].name;
  await visitor.save();
  res.json({ msg: "Visitor check-In request created" });
});

app.get("/visitors", async (req, res) => {
  const { date } = req.query;
  let visitors;
  if (date) {
    visitors = await Visitor.find({ checkout_time: date });
  } else {
    visitors = await Visitor.find({});
  }
  res.send(visitors);
});

app.put("/visitor/:id", async (req, res) => {
  console.log(req.body);
  let visitor = req.body;
  let visitorRecord = await Visitor.findOneAndUpdate(
    { _id: visitor._id },
    visitor,
    {
      upsert: true,
      new: true,
    }
  );
  res.send(visitorRecord);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

connect();

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://girishsv2401:WXg0pjH2TokSGeYk@cluster0.zarja.mongodb.net/?authSource=admin&compressors=zlib&retryWrites=true&w=majority&&ssl=true"
    );
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
}


// Serve the Angular build files
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//   });
// }