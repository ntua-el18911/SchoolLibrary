const express = require("express");
const cors = require("cors");
const figlet = require("figlet");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const sign_in = require("./routes/auth/signin.js");
const sign_up = require("./routes/auth/signup.js");
const school = require("./routes/utils/schools.js");
const getauthors = require("./routes/utils/getauthors.js");
const getcategories = require("./routes/utils/getcategories.js");
const getbooks = require("./routes/utils/getbooks.js");
const getuser = require("./routes/user/getuser.js");
const reservations = require("./routes/user/getreservations.js");
const addreservation = require("./routes/user/addreservation.js");
const book_activity = require("./routes/user/booklive.js");
const book_history = require("./routes/user/getbookhistory.js");
const cancel_reservation = require("./routes/user/deletereservation.js");

const admin_reservations = require("./routes/admin/allreservations.js");
const admin_delays = require("./routes/admin/bookdelays.js");
const admin_review_stats = require("./routes/admin/getstats.js");

app.use("/", sign_in);
app.use("/", sign_up);
app.use("/", school);
app.use("/", getauthors);
app.use("/", getcategories);
app.use("/", getbooks);
app.use("/", getuser);
app.use("/", reservations);
app.use("/", addreservation);
app.use("/", book_activity);
app.use("/", book_history);
app.use("/", admin_reservations);
app.use("/", admin_delays);
app.use("/", admin_review_stats);
app.use("/", cancel_reservation);

app.listen(process.env.PORT, () => {
    figlet("BookServer", function (error, data) {
        if (error) {
            console.error(" [+] Error with figlet.");
        }
        console.log(data);
        console.log(` [+] Book Server is up and running on port: ${process.env.PORT}.`);
    });
});