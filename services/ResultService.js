const Result = require("../models/Result");

class ResultService {
    createResult = async (user_id, quiz_id, score, answers) => {
        try {
            const result = new Result({
                user_id,
                quiz_id,
                score,
                answers
            });
            const savedResult = await result.save();
            return { status: 200, message: 'Result created successfully', data: savedResult };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error creating result" };
        }
    }

    getResultByID = async (id) => {
        try {
            const result = await Result.findById(id).populate('user_id').populate('quiz_id').populate('answers.question_id').populate('answers.user_choices');
            if (!result) {
                return { status: 404, message: "Result not found" };
            }
            return { status: 200, message: "Result retrieved successfully", data: result };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving result" };
        }
    }

    deleteResult = async (id) => {
        try {
            const deletedResult = await Result.findByIdAndDelete(id);
            if (!deletedResult) {
                return { status: 404, message: "Result not found" };
            }
            return { status: 200, message: "Result deleted successfully", data: deletedResult };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error deleting result" };
        }
    }
    getAllResults = async () => {
        try {
            const results = await Result.find().populate('user_id').populate('quiz_id').populate('answers.question_id').populate('answers.user_choices');
            return { status: 200, message: "Results retrieved successfully", data: results };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving results" };
        }
    }
}

module.exports = ResultService;
