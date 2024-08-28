const AdminLog = require("../models/AdminLog");
const AdminLogService = require("../services/AdminLogService");

class AdminLogController {
    postCreateLog = async (req, res) => {
        const { admin_id, action, target } = req.body;

        try {
            const data = await new AdminLogService().createLog(admin_id, action, target);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }

    getAllLogs = async (req, res) => {
        try {
            const data = await new AdminLogService().getAllLogs();
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching admin logs', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = AdminLogController;
