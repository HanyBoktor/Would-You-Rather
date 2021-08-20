import { RECEIVE_USERS } from '../actions/users'
import { ANS_QUESTIONS, ADD_QUESTIONS } from '../actions/questions'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ANS_QUESTIONS:
      const { authedUser, answer, qid } = action
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case ADD_QUESTIONS:
      const { author, id } = action
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      }
    default:
      return state
  }
}
