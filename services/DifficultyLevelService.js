const DifficultyLevel = require('../models/DifficultyLevel');

class DifficultyLevelService {
    createLevel = async (level_name, description) => {
        try {
            const level = new DifficultyLevel({ level_name, description });
            await level.save();
            return {
                status: 200,
                message: 'Level created successfully!',
                data: level
            };
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: 'Error while creating level'
            };
        }
    }

    getLevelByID = async (id) => {
        try {
            const level = await DifficultyLevel.findById(id);
            if (!level) {
                return { status: 404, message: "Level not found" };
            }
            return { status: 200, message: 'Successfully fetched level', data: level };
        } catch (error) {
            console.error(error);
            return { status: 500, message: 'Server error' };
        }
    }

    deleteLevel = async (id) => {
        try {
            const level = await DifficultyLevel.findByIdAndDelete(id);
            if (!level) {
                return { status: 404, message: "Level not found" };
            }
            return { status: 200, message: 'Level deleted successfully' };
        } catch (error) {
            console.error(error);
            return { status: 500, message: 'Server error' };
        }
    }    

    getLevelByPage = async (page, limit) => {
        try {
            const levels = await DifficultyLevel.find()
                .skip((page - 1) * limit)
                .limit(limit);
            const totalLevels = await DifficultyLevel.countDocuments();
            const totalPages = Math.ceil(totalLevels / limit);

            return {
                difficultyLevels: levels,
                totalPages: totalPages
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    updateLevel = async (id, level_name, description) => {
        try {
            const updatedLevel = await DifficultyLevel.findByIdAndUpdate(id, { level_name, description }, { new: true });
            if (!updatedLevel) {
                return { status: 404, message: "Level not found" };
            }
            return { status: 200, message: 'Level updated successfully!', data: updatedLevel };
        } catch (error) {
            console.error(error);
            return { status: 500, message: 'Error while updating level' };
        }
    }
    getAllLevels = async () => {
        try {
            const levels = await DifficultyLevel.find();
            return {
                status: 200,
                message: 'Successfully fetched all levels',
                data: levels
            };
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: 'Error while fetching levels'
            };
        }
    }
}

module.exports = DifficultyLevelService;
