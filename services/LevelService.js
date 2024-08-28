const Level = require("../models/Level");

class LevelService {
    createLevel = async (name) => {
        try {
            const level = new Level({ name });
            const savedLevel = await level.save();
            return { status: 200, message: 'Level created successfully', data: savedLevel };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error creating level" };
        }
    }

    getLevelByID = async (id) => {
        try {
            const level = await Level.findById(id);
            if (!level) {
                return { status: 404, message: "Level not found" };
            }
            return { status: 200, message: "Level retrieved successfully", data: level };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving level" };
        }
    }

    getAllLevels = async () => {
        try {
            const levels = await Level.find();
            return { status: 200, message: "Levels retrieved successfully", data: levels };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error retrieving levels" };
        }
    }

    deleteLevel = async (id) => {
        try {
            const deletedLevel = await Level.findByIdAndDelete(id);
            if (!deletedLevel) {
                return { status: 404, message: "Level not found" };
            }
            return { status: 200, message: "Level deleted successfully", data: deletedLevel };
        } catch (error) {
            console.error(error);
            return { status: 500, message: "Error deleting level" };
        }
    }
}

module.exports = LevelService;
