const Choice = require("../models/Choice");

class ChoiceService {
    createChoice = async (question_id, content, is_correct) => {
        try {
            const choice = new Choice({
                question_id,
                content,
                is_correct
            });
            const savedChoice = await choice.save();
            return { status: 200, message: 'Choice created successfully', data: savedChoice };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error creating choice" };
        }
    }

    getChoiceByID = async (id) => {
        try {
            const choice = await Choice.findById(id).populate('question_id');
            if (!choice) {
                return { status: 404, message: "Choice not found" };
            }
            return { status: 200, message: "Choice retrieved successfully", data: choice };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving choice" };
        }
    }

    deleteChoice = async (id) => {
        try {
            const deletedChoice = await Choice.findByIdAndDelete(id);
            if (!deletedChoice) {
                return { status: 404, message: "Choice not found" };
            }
            return { status: 200, message: "Choice deleted successfully", data: deletedChoice };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error deleting choice" };
        }
    }
}

module.exports = ChoiceService;
