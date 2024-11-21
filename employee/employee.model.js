const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [4, 'Name must be at least 4 characters long'],
            maxlength: [30, 'Name must be less than 30 characters'],
        },
        cid: {
            type: String,
            required: [true, 'Employee ID is required'],
            unique: true,
            match: [/^\d{3}$/, 'Employee ID must be exactly 3 digits'],
            trim: true,
        }
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
