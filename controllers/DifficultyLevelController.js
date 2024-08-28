const DifficultyLevel = require("../models/DifficultyLevel");
const DifficultyLevelService = require("../services/DifficultyLevelService");

class DifficultyLevelController {
    postCreateLevel = async (req, res) => {
        const { level_name, description } = req.body;

        try {
            const data = await new DifficultyLevelService().createLevel(level_name, description);
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

    getLevelByID = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new DifficultyLevelService().getLevelByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching difficulty level', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    deleteLevel = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new DifficultyLevelService().deleteLevel(id);
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
}

module.exports = DifficultyLevelController;
