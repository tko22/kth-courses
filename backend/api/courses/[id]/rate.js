const db = require("../../../lib/db");
const Courses = require("../../../lib/courses");
const cors = require("micro-cors")();
const errorWrap = require("../../../lib/errorWrap");

module.exports = cors(
  errorWrap(async (req, res) => {
    const {
      query: { id }
    } = req;
    db.connectToDatabase();

    if (req.method !== "PUT") {
      res.status(400).send("Request method not supported");
      return;
    }

    const body = req.body;
    if (!body || !body.rating) {
      res.status(400).send("Please include rating in the request body");
      return;
    }

    if (body.rating > 10 || body.rating < 0) {
      res.status(400).send("Rating isn't in range");
      return;
    }

    const course = await Courses.findOneAndUpdate(
      { courseID: id },
      {
        $push: { ratings: body.rating }
      }
    );
    await course.save();
    res.send(`Successfully added rating to course ${id}`);
  })
);
