const DifficultyLevel = require("../models/DifficultyLevel");

class DifficultyLevelService {
    createLevel = async (level_name, description) => {
        try {
            const level = new DifficultyLevel({
                level_name,
                description
            });
            const savedLevel = await level.save();
            return { status: 200, message: 'Difficulty level created successfully', data: savedLevel };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error creating difficulty level" };
        }
    }

    getLevelByID = async (id) => {
        try {
            const level = await DifficultyLevel.findById(id);
            if (!level) {
                return { status: 404, message: "Difficulty level not found" };
            }
            return { status: 200, message: "Difficulty level retrieved successfully", data: level };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving difficulty level" };
        }
    }

    deleteLevel = async (id) => {
        try {
            const deletedLevel = await DifficultyLevel.findByIdAndDelete(id);
            if (!deletedLevel) {
                return { status: 404, message: "Difficulty level not found" };
            }
            return { status: 200, message: "Difficulty level deleted successfully", data: deletedLevel };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error deleting difficulty level" };
        }
    }
}

module.exports = DifficultyLevelService;
