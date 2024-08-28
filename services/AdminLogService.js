const AdminLog = require("../models/AdminLog");

class AdminLogService {
    createLog = async (admin_id, action, target) => {
        try {
            const log = new AdminLog({
                admin_id,
                action,
                target
            });
            const savedLog = await log.save();
            return { status: 200, message: 'Admin log created successfully', data: savedLog };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error creating admin log" };
        }
    }

    getAllLogs = async () => {
        try {
            const logs = await AdminLog.find().populate('admin_id');
            return { status: 200, message: "Admin logs retrieved successfully", data: logs };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving admin logs" };
        }
    }
}

module.exports = AdminLogService;
