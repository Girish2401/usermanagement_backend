const express = require("express");
const router = express.Router();
const visitorController = require("./visitor.controller");

router.post("/add", visitorController.addVisitor);
router.get("/", visitorController.getVisitors);
router.get("/:id", visitorController.getVisitorByDate);
router.put("/:id", visitorController.updateVisitor);

module.exports = router;



