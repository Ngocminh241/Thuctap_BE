const Quiz = require("../models/Quiz");
const QuizService = require("../services/QuizService");

class QuizController {
    postCreateQuiz = async (req, res) => {
        const { title, description, difficulty_level, question_pack, is_public, created_by } = req.body;

        try {
            const data = await new QuizService().createQuiz(title, description, difficulty_level, question_pack, is_public, created_by);
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

    getQuizByID = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new QuizService().getQuizByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching quiz', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    deleteQuiz = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new QuizService().deleteQuiz(id);
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

    updateQuizInfo = async (req, res) => {
        const { id } = req.params;
        const { title, description, difficulty_level, is_public } = req.body;

        try {
            const data = await new QuizService().updateQuizInfo(id, title, description, difficulty_level, is_public);
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

    incrementPlayCount = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new QuizService().incrementPlayCount(id);
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

module.exports = QuizController;
