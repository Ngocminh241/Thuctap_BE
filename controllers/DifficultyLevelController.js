const DifficultyLevelService = require('../services/DifficultyLevelService');
const levelService = new DifficultyLevelService();

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

    getLevelByPage = async (req, res) => {
        const { page, limit } = req.query;
        try {
            const data = await new DifficultyLevelService().getLevelByPage(parseInt(page), parseInt(limit));
            res.json({
                status: 200,
                message: 'Successfully fetched levels',
                data: data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    updateLevel = async (req, res) => {
        const { id } = req.params;
        const { level_name, description } = req.body;

        try {
            const data = await levelService.updateLevel(id, level_name, description);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: 'Server error' });
        }
    }
    getAllLevels = async (req, res) => {
        try {
            const data = await levelService.getAllLevels();
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra khi lấy danh sách cấp độ" });
        }
    }
}

module.exports = DifficultyLevelController;
