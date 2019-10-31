const db = require('../../lib/db')
const Courses = require('../../lib/courses')

module.exports = async (req, res) => {
  db.connectToDatabase()
  const courses = await Courses.find()

  res.json(courses)
};
