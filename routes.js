const express = require("express");
const router = express();

const employeeRouter = require("./employee")
const visitorRouter = require("./visitor");

router.use("/employee", employeeRouter);
router.use("/visitor", visitorRouter);

module.exports = router;
