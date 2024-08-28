const Question = require("../models/Question");

class QuestionService {
    createQuestion = async (quiz_id, content, image, is_multiple_choice, minimum_choices, maximum_choices, choices) => {
        try {
            const question = new Question({
                quiz_id,
                content,
                image,
                is_multiple_choice,
                minimum_choices,
                maximum_choices,
                choices
            });
            const savedQuestion = await question.save();
            return { status: 200, message: 'Question created successfully', data: savedQuestion };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error creating question" };
        }
    }

    getQuestionByID = async (id) => {
        try {
            const question = await Question.findById(id).populate('choices').populate('quiz_id');
            if (!question) {
                return { status: 404, message: "Question not found" };
            }
            return { status: 200, message: "Question retrieved successfully", data: question };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving question" };
        }
    }

    deleteQuestion = async (id) => {
        try {
            const deletedQuestion = await Question.findByIdAndDelete(id);
            if (!deletedQuestion) {
                return { status: 404, message: "Question not found" };
            }
            return { status: 200, message: "Question deleted successfully", data: deletedQuestion };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error deleting question" };
        }
    }
}

module.exports = QuestionService;
