const Room = require("../models/Room");
const Showtimes = require("../models/Showtimes");
const Time = require("../models/Time");
const Category = require("../models/Category");
const ShowTimesService = require("../services/ShowtimesService");

class ShowTimesController {
    getAllShowtimes = async (req, res) => {
        try {
            const data = await Showtimes.find().populate('id_room').populate('id_time').populate('id_movie');
            // console.log('data: ', data);
            res.json({
                "status": 200,
                "messenger": "Danh sách phim",
                "data": data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getShowtimesByPage = async (req, res, next) => {
        const { page, limit } = req.query;
        try {
            // const data = await Category.find().populate();
            const data = await new ShowTimesService().getShowtimesByPage(page, limit);
            // console.log('data: ', movies);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
        }
    }
    getShowtimesByID = async (req, res, next) => {
        const { id } = req.params;
        try {
            const data = await new ShowTimesService().getShowtimesByID(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.error('Error fetching movie', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    getShowtimesByDate = async (req, res, next) => {
        const { date } = req.query;
        // console.log(date);
        try {
            const data = await new ShowTimesService().getShowtimesByDate(date);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
            console.log(
                {
                    status: data.status,
                    message: data.message,
                    data: data.data
                }
            );
        } catch (error) {
            console.error('Error fetching', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    getShowtimesByMovie = async (req, res, next) => {
        const { id_movie } = req.query;
        // console.log(id_movie);
        try {
            const data = await new ShowTimesService().getShowtimesByMovie(id_movie);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
            console.log(
                {
                    status: data.status,
                    message: data.message,
                    data: data.data
                }
            );
        } catch (error) {
            console.error('Error fetching', error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    addShowtimes = async (req, res, next) => {
        try {
            const date = req.body.date;
            const id_room = req.body.id_room;
            const id_time = req.body.id_time;
            const id_movie = req.body.id_movie;
            // console.log('date:', req.body);
            const data = await new ShowTimesService().addShowtimes(date, id_room, id_time, id_movie);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    updateShowtimes = async (req, res, next) => {
        try {
            const { id } = req.params
            const date = req.body.date;
            const id_room = req.body.id_room;
            const id_time = req.body.id_time;
            const id_movie = req.body.id_movie;
            const data = await new ShowTimesService().updateShowtimes(id, date, id_room, id_time, id_movie);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
    deleteShowtimes = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await new ShowTimesService().deleteShowtimes(id);
            res.json({
                status: data.status,
                message: data.message,
                data: data.data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Có lỗi xảy ra" });
        }
    }
}

module.exports = ShowTimesController;