import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddAnswer } from '../actions/questions'
import { Link } from 'react-router-dom'

class QuestionDetail extends Component {
  state = {
    selectedAnswer: ''
  }
  handleSaveAnswer(e) {
    e.preventDefault()
    const { dispatch, authedUser, id } = this.props
    const { selectedAnswer } = this.state
    dispatch(
      handleAddAnswer({
        qid: id,
        authedUser,
        answer: selectedAnswer
      })
    )
  }
  chooseAnswer(answer) {
    this.setState((e) => {
      return { selectedAnswer: answer }
    })
  }
  render() {
    const {
      question,
      author,
      answered,
      answer,
      votesOptionOne,
      votesOptionTwo,
      totalVotes,
      percentageOptionOne,
      percentageOptionTwo
    } = this.props
    const { selectedAnswer } = this.state

    if (!question) {
      return <Redirect to="/not-found" />
    }

    return (
      <div>
        {answered ? (
          <div class="result-container">
            <div>
              <img
                src={`/${author.avatarURL}`}
                alt={`avatar of ${author.name}`}
                className="avatar"
              />
            </div>
            <div>
              Question of {author.name}
              <br />
              Results:
            </div>
            <div className="container">
              <div
                className={
                  answer === 'optionOne' ? 'option-container selected' : 'option-container'
                }
              >
                <div>{question.optionOne.text}</div>
                <div>
                  <div>
                    {votesOptionOne} out of {totalVotes} votes
                  </div>
                  <div>Percentage votes: {percentageOptionOne}%</div>
                </div>
                <div className="your-vote">Your pick</div>
              </div>

              <div
                className={
                  answer === 'optionTwo' ? 'option-container selected' : 'option-container'
                }
              >
                <div>{question.optionTwo.text}</div>
                <div>
                  <div>
                    {votesOptionTwo} out of {totalVotes} votes
                  </div>
                  <div>Percentage votes: {percentageOptionTwo}%</div>
                </div>
                <div className="your-vote">Your pick</div>
              </div>
            </div>
            <Link to="/dashboard">
              <button>Back</button>
            </Link>
          </div>
        ) : (
          <div class="default-container">
            <div>
              <img
                src={`/${author.avatarURL}`}
                alt={`avatar of ${author.name}`}
                className="avatar"
              />
            </div>
            <div>
              {author.name} asks <br /> Would you rather
            </div>
            <div
              className={selectedAnswer === 'optionOne' ? 'option option-selected' : 'option'}
              onClick={(e) => {
                this.chooseAnswer('optionOne')
              }}
            >
              {question.optionOne.text}
            </div>
            ---------- OR -----------{' '}
            <div
              className={selectedAnswer === 'optionTwo' ? 'option option-selected' : 'option'}
              onClick={(e) => {
                this.chooseAnswer('optionTwo')
              }}
            >
              {question.optionTwo.text}
            </div>
            <button
              className={selectedAnswer ? 'btn-default' : 'disabled'}
              onClick={(e) => {
                this.handleSaveAnswer(e)
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const author = question ? users[question.author] : null
  const answered = question
    ? question.optionOne.votes.indexOf(authedUser) !== -1 ||
      question.optionTwo.votes.indexOf(authedUser) !== -1
    : false
  const votesOptionOne = question && question.optionOne.votes ? question.optionOne.votes.length : 0
  const votesOptionTwo = question && question.optionTwo.votes ? question.optionTwo.votes.length : 0
  const totalVotes = votesOptionOne + votesOptionTwo
  const percentageOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1)
  const percentageOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1)
  const answer = users[authedUser].answers[id]

  return {
    id,
    authedUser,
    question,
    author,
    answered,
    answer,
    votesOptionOne,
    votesOptionTwo,
    totalVotes,
    percentageOptionOne,
    percentageOptionTwo
  }
}

export default connect(mapStateToProps)(QuestionDetail)
