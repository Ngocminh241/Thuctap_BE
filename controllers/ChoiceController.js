const Choice = require("../models/Choice");
const ChoiceService = require("../services/ChoiceService");

class ChoiceController {
    postCreateChoice = async (req, res) => {
        const { question_id, content, is_correct } = req.body;

        try {
            const data = await new ChoiceService().createChoice(question_id, content, is_correct);
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

    getChoiceByID = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new ChoiceService().getChoiceByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching choice', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    deleteChoice = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new ChoiceService().deleteChoice(id);
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

module.exports = ChoiceController;
