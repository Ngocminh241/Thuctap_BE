const Question = require("../models/Question");
const QuestionService = require("../services/QuestionService");

class QuestionController {
    postCreateQuestion = async (req, res) => {
        const { quiz_id, content, image, is_multiple_choice, minimum_choices, maximum_choices, choices } = req.body;

        try {
            const data = await new QuestionService().createQuestion(quiz_id, content, image, is_multiple_choice, minimum_choices, maximum_choices, choices);
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

    getQuestionByID = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new QuestionService().getQuestionByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching question', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    deleteQuestion = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new QuestionService().deleteQuestion(id);
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

module.exports = QuestionController;
