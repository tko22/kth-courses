const db = require('../lib/db')
const Courses = require('../lib/courses')

module.exports = async (req, res) => {
  const {
    query: { id }
  } = req
  db.connectToDatabase()
  const course = await Courses.find({ courseID: id })

  res.json(course)
};
