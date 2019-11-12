const db = require("../../../lib/db");
const Courses = require("../../../lib/courses");
const errorWrap = require("../../../lib/errorWrap");
const cors = require("micro-cors")();

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
    if (!body || !body.type || !body.comment) {
      res.status(400).send("Please include comment type and comment to add");
      return;
    }

    if (
      ![
        "overallComments",
        "courseContents",
        "examination",
        "literature",
        "recommendedPrerequisites"
      ].includes(body.type)
    ) {
      res.status(404).send("Make sure your comment type is valid");
      return;
    }

    const course = await Courses.findOneAndUpdate(
      { courseID: id },
      {
        $push: { [body.type]: body.comment }
      }
    );
    await course.save();

    res.send(`successfully added comment to course ${id}`);
  })
);
