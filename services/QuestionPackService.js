const QuestionPack = require('../models/QuestionPack'); // Đảm bảo bạn đã import model QuestionPack

class QuestionPackService {
    // Phương thức tạo gói câu hỏi
    createPack = async (level_id, pack_name, number_of_questions, questions) => {
        try {
            const newPack = new QuestionPack({
                level_id,
                pack_name,
                number_of_questions,
                questions
            });

            // Lưu gói câu hỏi mới vào cơ sở dữ liệu
            const savedPack = await newPack.save();
            return {
                status: 200,
                message: "Tạo gói câu hỏi thành công",
                data: savedPack
            };
        } catch (error) {
            console.error('Error creating question pack', error);
            throw new Error("Lỗi khi tạo gói câu hỏi");
        }
    }

    // Phương thức lấy gói câu hỏi theo ID
    getPackByID = async (id) => {
        try {
            const questionPack = await QuestionPack.findById(id);

            if (!questionPack) {
                return {
                    status: 404,
                    message: "Gói câu hỏi không tồn tại",
                    data: null
                };
            }

            return {
                status: 200,
                message: "Lấy gói câu hỏi thành công",
                data: questionPack
            };
        } catch (error) {
            console.error('Error fetching question pack by ID', error);
            throw new Error("Lỗi khi lấy gói câu hỏi");
        }
    }

    // Phương thức lấy tất cả gói câu hỏi
    getAllQuestionPacks = async () => {
        try {
            const questionPacks = await QuestionPack.find();
            return {
                status: 200,
                message: "Lấy tất cả gói câu hỏi thành công",
                data: questionPacks
            };
        } catch (error) {
            console.error('Error fetching all question packs', error);
            throw new Error("Lỗi khi lấy tất cả gói câu hỏi");
        }
    }

    // Phương thức lấy gói câu hỏi theo phân trang
    getPacksByPage = async (page = 1, limit = 5) => {
        const skip = (page - 1) * limit;
        try {
            // Đếm tổng số gói câu hỏi trong cơ sở dữ liệu
            const totalPacks = await QuestionPack.countDocuments();
    
            // Lấy các gói câu hỏi theo phân trang và sử dụng populate để lấy chi tiết level_id
            const questionPacks = await QuestionPack.find()
                .populate('level_id') // Sử dụng populate để lấy thông tin từ bảng DifficultyLevel
                .skip(skip) // Bỏ qua số lượng gói câu hỏi trước đó (tính theo trang)
                .limit(parseInt(limit)) // Giới hạn số lượng gói câu hỏi mỗi trang
                .exec();
    
            // Tính tổng số trang
            const totalPages = Math.ceil(totalPacks / limit);
    
            return {
                status: 200,
                message: "Lấy gói câu hỏi theo phân trang thành công",
                data: {
                    questionPacks,
                    totalPages
                }
            };
        } catch (error) {
            console.error('Error fetching question packs by page', error);
            throw new Error("Lỗi khi lấy dữ liệu gói câu hỏi theo phân trang");
        }
    }
    
    // Phương thức xóa gói câu hỏi
    deletePack = async (id) => {
        try {
            const deletedPack = await QuestionPack.findByIdAndDelete(id);
            if (!deletedPack) {
                return {
                    status: 404,
                    message: "Gói câu hỏi không tồn tại để xóa",
                    data: null
                };
            }

            return {
                status: 200,
                message: "Xóa gói câu hỏi thành công",
                data: deletedPack
            };
        } catch (error) {
            console.error('Error deleting question pack', error);
            throw new Error("Lỗi khi xóa gói câu hỏi");
        }
    }
    updatePack = async (id, level_id, pack_name, number_of_questions, questions) => {
        try {
            const updatedPack = await QuestionPack.findByIdAndUpdate(
                id,
                { level_id, pack_name, number_of_questions, questions },
                { new: true }
            );

            if (!updatedPack) {
                return {
                    status: 404,
                    message: "Gói câu hỏi không tồn tại",
                    data: null
                };
            }

            return {
                status: 200,
                message: "Cập nhật gói câu hỏi thành công",
                data: updatedPack
            };
        } catch (error) {
            console.error('Error updating question pack', error);
            throw new Error("Lỗi khi cập nhật gói câu hỏi");
        }
    }
}

module.exports = QuestionPackService;
