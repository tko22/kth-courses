const db = require('../lib/db')
const Courses = require('../lib/courses')

module.exports = async (req, res) => {
  // const {
  //   query: { name }
  // } = req;
  db.connectToDatabase()
  const tempCourse = new Courses({ name: "Course 1" })
  await tempCourse.save()


  res.send(`Hello Timothy! `)
};
