const express = require("express");
const router = express.Router();
const employeeController = require("./employee.controller");

router.post("/", employeeController.addEmployee);
router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeDetails);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;



