const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        employee_id: {
            type: String,
            required: [true, 'Employee ID is required'],
            unique: true,
            match: [/^\d{3}$/, 'Employee ID must be exactly 3 digits'],
            trim: true,
        },
        employee_name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [4, 'Name must be at least 4 characters long'],
            maxlength: [30, 'Name must be less than 30 characters'],
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
