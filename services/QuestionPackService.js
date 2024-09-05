const QuestionPack = require("../models/QuestionPack");

class QuestionPackService {
    createPack = async (level_id, pack_name, number_of_questions, questions) => {
        try {
            const pack = new QuestionPack({
                level_id,
                pack_name,
                number_of_questions,
                questions
            });
            const savedPack = await pack.save();
            return { status: 200, message: 'Question pack created successfully', data: savedPack };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error creating question pack" };
        }
    }

    getAllQuestionPacks = async () => {
        try {
            const packs = await QuestionPack.find().populate('questions').populate('level_id');
            return { status: 200, message: "Question packs retrieved successfully", data: packs };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving question packs" };
        }
    }    

    getPackByID = async (id) => {
        try {
            const pack = await QuestionPack.findById(id).populate('questions').populate('level_id');
            if (!pack) {
                return { status: 404, message: "Question pack not found" };
            }
            return { status: 200, message: "Question pack retrieved successfully", data: pack };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving question pack" };
        }
    }

    deletePack = async (id) => {
        try {
            const deletedPack = await QuestionPack.findByIdAndDelete(id);
            if (!deletedPack) {
                return { status: 404, message: "Question pack not found" };
            }
            return { status: 200, message: "Question pack deleted successfully", data: deletedPack };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error deleting question pack" };
        }
    }
}

module.exports = QuestionPackService;
