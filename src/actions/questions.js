import { saveQuestionAnswer, saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANS_QUESTIONS = 'ANS_QUESTIONS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'

export function receiveQuestion(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion({ id, timestamp, author, optionOne, optionTwo }) {
  return {
    type: ADD_QUESTIONS,
    id,
    author,
    timestamp,
    optionOne,
    optionTwo
  }
}

function answerQuestion({ qid, authedUser, answer }) {
  return {
    type: ANS_QUESTIONS,
    authedUser,
    qid,
    answer
  }
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info))
    return saveQuestionAnswer(info)
      .then(() => console.log('recorded answer'))
      .catch((e) => {
        console.log('There was a problem saving question.', e)
        dispatch(answerQuestion(info))
        alert('there is an error, please try again')
      })
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => {
        dispatch(addQuestion(question))
      })
      .catch((e) => {
        console.log('problem during saving question.', e)
        alert('problem during saving question. Please try again ')
      })
  }
}
