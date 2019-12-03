import React from 'react'
import { ModelContext } from '../../ModelContext'
import ListGroupItem from '../../components/ListGroupItem/ListGroupItem';


class ProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: "LOADING", htmlFavourites: "" }
  }

  async componentDidMount() {
    let favCourses = this.context.model.getCookie("favourites").split(","); //Is a string when one fav course
    favCourses = await (favCourses.map(courseID=>(
       this.context.model.getCourseKTH(courseID)
    )))
    let htmlFavourites = (favCourses.map(course => (
        <ListGroupItem link={`/course/${course.id}`} name={course.name} />
    )));
    this.setState({ status: "LOADED", htmlFavourites: htmlFavourites });
    
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <h4>Your Favorited Courses</h4>
          <table className="table table-sm table-hover text-left">
            <tr className="text-secondary">
              <th scope="col">Course Code</th>
              <th scope="col">Title</th>
              <th scope="col">Credits</th>
              <th scope="col">Educational Level</th>
            </tr>
          </table>
        </div>
      </div>
    )
  }

}
ProfilePage.contextType = ModelContext;
export default ProfilePage