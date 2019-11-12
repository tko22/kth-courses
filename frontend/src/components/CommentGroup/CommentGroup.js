import React from 'react'
import CommentList from '../CommentList/CommentList'
import { ModelContext } from '../../ModelContext'

class CommentGroup extends React.Component {
  constructor() {
    super()
    this.state = {
      commentInput: ""
    }
  }
  onCommentInputChange = e => {
    this.setState({ commentInput: e.target.value });
  }

  postComment = () => {
    console.log("hm", this.props.commentType)
    this.context.model.comment(this.props.commentType, this.state.commentInput)
    this.setState({
      commentInput: ""
    })
  }
  render() {
    const { comments, title } = this.props

    return (
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              {title}
            </button>
          </h5>
        </div>

        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Input" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onCommentInputChange} value={this.state.commentInput} />
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