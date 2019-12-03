import React from 'react'
import CommentList from '../CommentList/CommentList'
import { ModelContext } from '../../ModelContext'
import { getAvgRating } from '../../common/utilities'

class CommentGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentInput: "",
      comments: this.props.comments ? this.props.comments : [],
      ratings: this.props.ratings ? this.props.ratings : [],
      ratingTypes: []
    }
  }
  onCommentInputChange = e => {
    this.setState({ commentInput: e.target.value });
  }
  async componentDidMount() {
    this.setState({ ratingTypes: this.context.model.getRatingTypes() });
  }

  componentDidUpdate(prevProps) {
    if (this.props.comments !== null && prevProps.comments !== this.props.comments) {
      this.setState({
        comments: this.props.comments ? this.props.comments : []
      })
    }
    if (this.props.ratings !== null && prevProps.ratings !== this.props.ratings) {
      this.setState({
        ratings: this.props.ratings ? this.props.ratings : []
      })
    }
  }

  rateSection = async (userRating) => {
    await this.context.model.rateSection(this.props.courseCode, this.props.ratingType, userRating, this.props.courseName)
    let newRatings = this.state.ratings
    newRatings.push(userRating)
    this.setState({ ratings: newRatings });
    window.alert(`Rated ${this.props.title} ${userRating}/5!`)
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
            {this.props.ratingType != undefined && <span className="badge badge-info float-right">Rating: {getAvgRating(this.state.ratings)} </span>}
          </h5>
        </div>
        <div id={`collapse-${commentType}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div className="card-body">
            <div className="row">
              <div className="col">Rate subsection:</div>
              <div className="col">
                <fieldset class="rating">
                  {this.state.ratingTypes.map(rating=>{
                      return <><input type="radio" id={`star${rating[0]}${title}`} className="rating" value={rating[0]} onClick={() => {this.rateSection(rating[0])}}/><label className ={rating[2]} for={`star${rating[0]}${title}`} title={rating[1]}></label></>;  
                  })}
                </fieldset>
              </div>             
            </div>          
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