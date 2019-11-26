import React from 'react'
import { ModelContext } from '../../ModelContext'
import { withRouter } from 'react-router-dom'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: null,
      loading: true
    }
  }
  async componentDidMount() {
    const input = this.props.match.params.input;
    const results = await this.context.model.search(input);
    const { searchHits } = results
    this.setState({
      courses: searchHits,
      loading: false
    })
  }

  async componentDidUpdate(prevProps) {
    const input = this.props.match.params.input;
    if (input != null && prevProps.match.params.input !== input) {
      this.setState({
        loading: true
      })
      const results = await this.context.model.search(input);
      const { searchHits } = results
      this.setState({
        courses: searchHits,
        loading: false
      })
    }
  }

  courseClicked = code => {
    this.props.history.push(`/course/${code}`)
  }
  render() {
    const { courses, loading } = this.state
    if (!courses || loading) {
      return <p className="mt-3">Loading...</p>
    }

    return (
      <div className="container">
        <div className="row mb-3 mt-3">
          <h2>Results for "{this.props.match.params.input}"</h2>
        </div>
        <table className="table table-sm table-hover text-left">
          <tr className="text-secondary">
            <th scope="col">Course Code</th>
            <th scope="col">Title</th>
            <th scope="col">Credits</th>
            <th scope="col">Educational Level</th>
          </tr>
          <tbody>
            {courses.map(item => (
              <tr key={item.course.courseCode} onClick={() => this.courseClicked(item.course.courseCode)}>
                <th>{item.course.courseCode}</th>
                <th>{item.course.title}</th>
                <th>{item.course.credits} {item.course.creditUnitAbbr}</th>
                <th><span className={`badge ${item.course.educationalLevel === "RESEARCH" ? "badge-secondary" : (item.course.educationalLevel === "ADVANCED" ? "badge-warning" : "badge-primary")}`}>{item.course.educationalLevel}</span></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    )
  }
}

Search.contextType = ModelContext;
export default withRouter(Search)