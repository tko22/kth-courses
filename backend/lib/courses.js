var mongoose = require("mongoose");

const Courses = mongoose.Schema({
  name: { type: String },
  courseID: { type: String, unique: true, require: true },
  overallComments: [{ type: String }],
  courseContents: [{ type: String }],
  examination: [{ type: String }],
  literature: [{ type: String }],
  recommendedPrerequisites: [{ type: String }],
  ratings: [{ type: Number }],
  courseRating: [{ type: Number }],
  examinationRating: [{ type: Number }],
  literatureRating: [{ type: Number }],
  recommendedPrerequisitesRating: [{ type: Number }]
});

module.exports = mongoose.model("Courses", Courses);
