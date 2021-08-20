import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleChangeOptionOne = (e) => {
    const optionOneText = e.target.value
    this.setState(() => ({
      optionOneText
    }))
  }

  handleChangeOptionTwo = (e) => {
    const optionTwoText = e.target.value
    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    console.log('New question: ', this.state)
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="default-container">
        <div className="center">New Question Added</div>
        <form onSubmit={this.handleSubmit} className="center">
          <textarea
            placeholder="insert the first choice"
            value={optionOneText}
            onChange={this.handleChangeOptionOne}
          />
          <div className="center"> OR</div>
          <textarea
            placeholder="insert the second choice"
            value={optionTwoText}
            onChange={this.handleChangeOptionTwo}
          />
          <br />
          <button
            type="submit"
            disabled={(optionTwoText && optionOneText) === ''}
            className="center"
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)
