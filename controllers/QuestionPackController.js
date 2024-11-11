const QuestionPackService = require('../services/QuestionPackService');

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

    getAllQuestionPacks = async (req, res) => {
        try {
            const data = await new QuestionPackService().getAllQuestionPacks();
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

    // Phương thức mới: lấy gói câu hỏi theo phân trang
    getPacksByPage = async (req, res) => {
        const { page, limit } = req.query;
        try {
            const data = await new QuestionPackService().getPacksByPage(page, limit);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra khi lấy dữ liệu" });
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
    updatePack = async (req, res) => {
        const { id } = req.params;
        const { level_id, pack_name, number_of_questions, questions } = req.body;

        try {
            const data = await new QuestionPackService().updatePack(id, level_id, pack_name, number_of_questions, questions);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra khi cập nhật gói câu hỏi" });
        }
    }
}

module.exports = QuestionPackController;
