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
    this.context.model.comment(this.props.commentType, this.state.commentInput)
    let newComments = this.state.comments
    newComments.push(this.state.commentInput)
    this.setState((state) => ({
      commentInput: "",
      comments: newComments
    }))
  }
  render() {
    const { title, commentType } = this.props
    const { comments } = this.state

    return (
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn collapsed" data-toggle="collapse" data-target={`#collapse-${commentType}`} aria-expanded="true" aria-controls={`#collapse-${commentType}`}>
              {title}
            </button>
          </h5>
        </div>

        <div id={`collapse-${commentType}`} class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Comment here" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onCommentInputChange} value={this.state.commentInput} />
              <div class="input-group-append">
                <button class="btn btn-dark" type="button" onClick={this.postComment}>Comment</button>
              </div>
            </div>
            <ul class="list-group">
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