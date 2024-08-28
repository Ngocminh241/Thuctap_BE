const Level = require("../models/Level");
const LevelService = require("../services/LevelService");

class LevelController {
    postCreateLevel = async (req, res) => {
        const { name } = req.body;

        try {
            const data = await new LevelService().createLevel(name);
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
            const data = await new LevelService().getLevelByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching level', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    getAllLevels = async (req, res) => {
        try {
            const data = await new LevelService().getAllLevels();
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching levels', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    deleteLevel = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new LevelService().deleteLevel(id);
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

module.exports = LevelController;
