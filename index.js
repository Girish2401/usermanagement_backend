const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");
const _ = require("lodash");


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
app.use("/", router);


app.get('/', (req, res) => {
  res.status(200).json({});
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