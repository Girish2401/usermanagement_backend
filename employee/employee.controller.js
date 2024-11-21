const Employee = require("./employee.model");


exports.addEmployee = async (req, res) => {
    const { cid, name } = req.body;
    try {
        //check for existing employee
        const existingEmployee = await Employee.findOne({ cid });

        if (existingEmployee)
            return res.status(400).json({ message: "Employee ID already registered.try someother new" });

        // creating the employee instance
        const employee = new Employee({ ...req.body });

        // Save the employee to the database
        await employee.save();

        // Respond with success and return employee data
        res.status(201).json({
            message: 'Employee created successfully',
            data: employee,
        });
    } catch (error) {
        console.error("Error registering Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getEmployees = async (req, res) => {
    try {
        let employees = await Employee.find({});
        
        res.status(200).json({
            success: true,
            message: 'Employees retrieved successfully',
            data: employees,
        });
    } catch (error) {
        console.error("Error retriving Employees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getEmployeeDetails = async (req, res) => {
    try {
        if (!req.params.id || typeof req.params.id !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Invalid or missing CID parameter',
            });
        }
        // Fetch employees with the provided `cid`
        let employee = await Employee.find({ cid: req.params.id });

        // Check if the employee(s) were found
        if (!employee || employee.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No employees found with CID: ${req.params.id}`,
            }); console.error("Error retriving Employee:", error);
            res.status(500).json({ message: "Internal server error" });
        }

        // Send the retrieved employee(s)
        res.status(200).json({
            success: true,
            message: 'Employee retrieved successfully',
            data: employee,
        });
    } catch (error) {
        console.error("Error retriving Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};
exports.updateEmployee = async (req, res) => {
    try {
        const employee_id = req.params.id;
        let employee = req.body;

        // Validate if `cid` exists in the request body
        if (!employee_id) {
            return res.status(400).json({
                success: false,
                message: 'employeeId is required to update employee record',
            });
        }

        //check for existing employee
        const existingEmployee = await Employee.findOne({ employee_id });

        if (existingEmployee)
            return res.status(400).json({ message: "Employee ID already registered.try someother new" });

        //update employee details
        const employeeRecord = await Employee.findOneAndUpdate(
            { cid: employee_id },
            employee,
            {
                new: true,
                runValidators: true,
            }
        );

        // Send the updated or created employee record as the response
        res.status(200).json({
            success: true,
            message: 'Employee record updated or created successfully',
            data: employeeRecord,
        });
    } catch (error) {
        console.error("Error retriving Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the `id` parameter
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID is required for deletion',
            });
        }

        // Find and delete the employee by `cid`
        const deletedEmployee = await Employee.findOneAndDelete({ cid: id });

        // If no employee is found, return a 404
        if (!deletedEmployee) {
            return res.status(404).json({
                success: false,
                message: `No employee found with CID: ${id}`,
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: `Employee with CID: ${id} deleted successfully`,
            data: deletedEmployee,
        });
    } catch (error) {
        console.error("Error retriving Employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};






