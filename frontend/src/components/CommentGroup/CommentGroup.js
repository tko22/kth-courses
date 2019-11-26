import React from 'react'
import CommentList from '../CommentList/CommentList'
import { ModelContext } from '../../ModelContext'

class CommentGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentInput: "",
      comments: this.props.comments ? this.props.comments : []
    }
  }
  onCommentInputChange = e => {
    this.setState({ commentInput: e.target.value });
  }

  componentDidUpdate(prevProps) {
    if (this.props.comments !== null && prevProps.comments !== this.props.comments) {
      this.setState({
        comments: this.props.comments ? this.props.comments : []
      })
    }
  }

  postComment = () => {
    this.context.model.comment(this.props.courseCode, this.props.commentType, this.state.commentInput, this.props.courseName)
    let newComments = this.state.comments
    newComments.push(this.state.commentInput)
    this.setState({
      commentInput: "",
      comments: newComments
    })
  }
  render() {
    const { title, commentType } = this.props
    const { comments } = this.state

    return (
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button className="btn collapsed" data-toggle="collapse" data-target={`#collapse-${commentType}`} aria-expanded="true" aria-controls={`#collapse-${commentType}`}>
              {title} <span className="badge badge-secondary">{this.state.comments.length}</span>
            </button>
          </h5>
        </div>

        <div id={`collapse-${commentType}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div className="card-body">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Comment here" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onCommentInputChange} value={this.state.commentInput} />
              <div className="input-group-append">
                <button className="btn btn-dark" type="button" onClick={this.postComment}>Comment</button>
              </div>
            </div>
            <ul className="list-group">
              <CommentList comments={comments ? comments : null} />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

CommentGroup.contextType = ModelContext;
export default CommentGroup