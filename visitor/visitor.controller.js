const Visitor = require("./visitor.model");
const Employee = require("../employee/employee.model");

exports.addVisitor = async (req, res) => {
    const { employee_id } = req.body;
    try {
        // Validate the required fields in the request body
        if (!employee_id) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID is required for visitor check-in',
            });
        }

        // Check if the employee exists in the database
        const employee = await Employee.findOne({ cid: employee_id });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: `No employee found with ID: ${employee_id}`,
            });
        }
        // Create a new visitor record
        let visitor = new Visitor({ ...req.body, employee_name: employee.name, });

        // Save the visitor record in the database
        await visitor.save();

        // Respond with success
        res.status(201).json({
            success: true,
            message: 'Visitor check-in request created successfully',
        });
    } catch (error) {
        console.error("Error registering visitor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getVisitorByDate = async (req, res) => {
    const { date } = req.query;
    try {
        // Validate the `date` parameter
        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date query parameter is required',
            });
        }

        // Parse and validate the date format
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format. Please provide a valid date (e.g., YYYY-MM-DD)',
            });
        }

        const visitors = await Visitor.find({ checkout_time: date });

        // If no visitors are found, return a 404 response
        if (!visitors || visitors.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No visitors found for the date: ${date}`,
            });
        }

        // Respond with the retrieved visitors
        res.status(200).json({
            success: true,
            message: 'Visitors retrieved successfully',
            data: visitors,
        });
    } catch (error) {
        console.error("Error registering visitor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getVisitors = async (req, res) => {
    try {
        // Fetch all visitors
        const visitors = await Visitor.find({});

        res.status(200).json({
            success: true,
            data: visitors,
        });
    } catch (error) {
        console.error('Error fetching visitors:', error);

        // Respond with a server error status and message
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching visitors. Please try again later.',
        });
    }
};

exports.updateVisitor = async (req, res) => {
    try {
        // Validate request body
        const visitor = req.body;
        if (!visitor || !visitor._id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input: Visitor ID is required.',
            });
        }

        // Find and update the visitor record
        const visitorRecord = await Visitor.findOneAndUpdate(
            { _id: visitor._id },
            visitor,
            {
                upsert: true,
                new: true,
            }
        );

        // Check if the operation was successful
        if (!visitorRecord) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update visitor record.',
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            data: visitorRecord,
            message: 'Visitor record updated successfully.',
        });
    } catch (error) {
        console.error('Error updating visitor:', error);

        // Send server error response
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the visitor record.'
        });
    }
};