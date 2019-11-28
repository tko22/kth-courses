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

    // cors
    if (req.method === "OPTIONS") {
      return res.send("ok!");
    }

    if (req.method !== "POST") {
      res.status(400).send("Request method not supported");
      return;
    }

    const body = req.body;
    if (!body || !body.rating || !body.type) {
      res.status(400).send("Please include rating in the request body");
      return;
    }

    if (typeof body.rating !== "number") {
      res.status(400).send("Rating must be a number");
      return;
    }

    if (body.rating > 10 || body.rating < 0) {
      res.status(400).send("Rating isn't in range");
      return;
    }

    if (
      ![
        "courseRating",
        "examinationRating",
        "literatureRating",
        "recommendedPrerequisitesRating"
      ].includes(body.type)
    ) {
      res.status(404).send("Make sure your rating section type is valid");
      return;
    }

    const course = await Courses.findOneAndUpdate(
      { courseID: id },
      {
        $push: { [body.type]: body.rating }
      }
    );
    await course.save();
    res.send({
      msg: `Successfully added rating section ${body.type} to course ${id}`,
      success: true
    });
  })
);
