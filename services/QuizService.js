const Quiz = require("../models/Quiz");

class QuizService {
    createQuiz = async (title, description, difficulty_level, question_pack, is_public, created_by) => {
        try {
            const quiz = new Quiz({
                title,
                description,
                difficulty_level,
                question_pack,
                is_public,
                created_by
            });
            const savedQuiz = await quiz.save();
            return { status: 200, message: 'Quiz created successfully', data: savedQuiz };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error creating quiz" };
        }
    }

    getQuizByID = async (id) => {
        try {
            const quiz = await Quiz.findById(id).populate('questions').populate('created_by').populate('difficulty_level').populate('question_pack');
            if (!quiz) {
                return { status: 404, message: "Quiz not found" };
            }
            return { status: 200, message: "Quiz retrieved successfully", data: quiz };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving quiz" };
        }
    }

    deleteQuiz = async (id) => {
        try {
            const deletedQuiz = await Quiz.findByIdAndDelete(id);
            if (!deletedQuiz) {
                return { status: 404, message: "Quiz not found" };
            }
            return { status: 200, message: "Quiz deleted successfully", data: deletedQuiz };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error deleting quiz" };
        }
    }

    updateQuizInfo = async (id, title, description, difficulty_level, is_public) => {
        try {
            const updatedQuiz = await Quiz.findByIdAndUpdate(id, { title, description, difficulty_level, is_public }, { new: true });
            if (!updatedQuiz) {
                return { status: 404, message: "Quiz not found" };
            }
            return { status: 200, message: "Quiz updated successfully", data: updatedQuiz };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error updating quiz" };
        }
    }

    incrementPlayCount = async (id) => {
        try {
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                return { status: 404, message: "Quiz not found" };
            }
            quiz.total_plays += 1;
            const updatedQuiz = await quiz.save();
            return { status: 200, message: "Play count incremented", data: updatedQuiz };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error incrementing play count" };
        }
    }
}

module.exports = QuizService;
