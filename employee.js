const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    cid: Number,
    status: {
        type: String, 
        required: true, 
        enum: ["NA", "pending", "accepted","rejected"],
        default:"NA" 
    },
    isCheckedIn: {
      type: Boolean,
      default: false,
    },
    security_request_status: {
      type: Boolean,
      default: false,
    },
    approver_request_status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "modified_date",
    },
    versionKey: false,
  }
);

const employee = mongoose.model("employee", employeeSchema);
module.exports = employee;
