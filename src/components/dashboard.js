import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './question'

class Dashboard extends Component {
  state = { isAnswered: false }
  filterQuestions = (isAnswered) => {
    this.setState((e) => {
      return { isAnswered }
    })
  }

  render() {
    const { isAnswered } = this.state
    const { authedUser, questions } = this.props
    const filteredQuestions = questions.filter((question) => {
      const contains =
        question.optionOne.votes.indexOf(authedUser) !== -1 ||
        question.optionTwo.votes.indexOf(authedUser) !== -1
      return isAnswered ? contains : !contains
    })

    console.log('here is autheduser: ', this.props)
    console.log('here is filteres:', filteredQuestions)
    const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp)
    return (
      <div>
        <div>
          <button onClick={(e) => this.filterQuestions(false)} className="btn">
            Unanswered Questions
          </button>
          <button onClick={(e) => this.filterQuestions(true)}>Answered Questions</button>
        </div>

        <ul>
          {sortedQuestions.map((question) => (
            <li key={question.id}>
              <Question id={question.id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    authedUser,
    questions: Object.values(questions)
  }
}

export default connect(mapStateToProps)(Dashboard)
