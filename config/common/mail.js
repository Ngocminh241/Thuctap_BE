var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ngocminhnguyen241@gmail.com",
        pass: "aueb kcxh vwwf vrhf"
    }
});
module.exports = transporter 