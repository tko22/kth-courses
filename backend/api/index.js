const db = require("../lib/db");
const Courses = require("../lib/courses");
const cors = require("micro-cors")();
const errorWrap = require("../lib/errorWrap");

module.exports = cors(
  errorWrap(async (req, res) => {
    // const {
    //   query: { name }
    // } = req;
    db.connectToDatabase();
    const tempCourse = new Courses({ name: "Course 1" });
    await tempCourse.save();

    res.send(`Hello Timothy! `);
  })
);
