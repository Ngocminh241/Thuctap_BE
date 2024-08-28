const QuestionPack = require("../models/QuestionPack");
const QuestionPackService = require("../services/QuestionPackService");

class QuestionPackController {
    postCreatePack = async (req, res) => {
        const { level_id, pack_name, number_of_questions, questions } = req.body;

        try {
            const data = await new QuestionPackService().createPack(level_id, pack_name, number_of_questions, questions);
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

    getPackByID = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new QuestionPackService().getPackByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching question pack', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    deletePack = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new QuestionPackService().deletePack(id);
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

module.exports = QuestionPackController;
