const db = require('../../lib/db')
const Courses = require('../../lib/courses')

module.exports = async (req, res) => {
  db.connectToDatabase()

  if (req.method === 'POST') {
    const body = req.body
    if (!body || !body.name || !body.courseID) {
      res.status(400).send('Please include at Course name and courseID')
    }
    const course = new Courses({ name: body.name, courseID: body.courseID })
    await course.save()
    res.send(`successfully created Course ${body.name}`)
    return
  }

  const courses = await Courses.find()
  res.json(courses)
};
