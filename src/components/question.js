import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'
class Question extends Component {
  render() {
    const { question } = this.props
    if (question === null) {
      return <p>No Question here</p>
    }
    console.log('each question: ', this.props)
    const { name, avatar, optionOne, optionTwo } = question
    return (
      <div class="default-container">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div>
          {name} asks would you rather ?
          <br />
          {optionOne.text}
          <br />
          <br />
          -----OR-----
          <br />
          <br />
          {optionTwo.text}
        </div>
        <br />
        <Link to={`question/${question['id']}`}>
          <button>View Details</button>
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: formatQuestion(question, users[question.author], authedUser)
  }
}

export default withRouter(connect(mapStateToProps)(Question))
