const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const visitorSchema = new mongoose.Schema(
  {
    employee_id: {
      type: Number,
    },
    employee_name: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    reason: {
      type: String,
    },
    role: {
      type: String,
    },
    isCheckedIn: {
      type: Boolean,
      default: false,
    },
    security_checkin_request_status: {
      type: Boolean,
      default: false,
    },
    approver_checkin_request_status: {
      type: Boolean,
      default: false,
    },
    security_checkout_request_status: {
      type: Boolean,
      default: false,
    },
    approver_checkout_request_status: {
      type: Boolean,
      default: false,
    },
    checkout_time: {
      type: Date,
      default: null,
    },
    checkin_time: {
      type: Date,
      default: null,
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

const visitor = mongoose.model("visitor", visitorSchema);
module.exports = visitor;
