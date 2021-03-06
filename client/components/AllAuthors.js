import React from 'react'
import {connect} from 'react-redux'
import {getAllAuthorsThunk} from '../store/authors'
import {Link} from 'react-router-dom'

class AllAuthors extends React.Component {
  // constructor() {
  //   super()
  // }

  componentDidMount() {
    this.props.getAllAuthors()
  }
  render() {
    const allAuthors = this.props.authors
    return (
      <div className="books-container">
        {allAuthors === undefined || !allAuthors.length ? (
          <h3>Loading...</h3>
        ) : (
          allAuthors.map(author => (
            <div className="book-container" key={author.id}>
              <div className="book-container-left">
                <img src={author.image} />
              </div>
              <div className="book-container-right">
                <Link to={`/authors/${author.id}`}>
                  <p>{author.name}</p>
                </Link>
                <p>{author.bio}</p>
              </div>
            </div>
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authors: state.authors
})

const mapDispatchToProps = dispatch => ({
  getAllAuthors: () => dispatch(getAllAuthorsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllAuthors)
