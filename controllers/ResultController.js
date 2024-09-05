const Result = require("../models/Result");
const ResultService = require("../services/ResultService");

class ResultController {
    postCreateResult = async (req, res) => {
        const { user_id, quiz_id, score, answers } = req.body;

        try {
            const data = await new ResultService().createResult(user_id, quiz_id, score, answers);
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

    getResultByID = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new ResultService().getResultByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.error('Error fetching result', error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    deleteResult = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await new ResultService().deleteResult(id);
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
    getAllResults = async (req, res) => {
        try {
            const data = await new ResultService().getAllResults();
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

module.exports = ResultController;
