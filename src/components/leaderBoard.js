import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render() {
    const { users, usersList } = this.props
    usersList.map(
      (user) => (user.totalScore = Object.keys(user.answers).length + user.questions.length)
    )
    const sortedUsers = users.sort((a, b) => b.totalScore - a.totalScore)
    return (
      <ul className="users-list">
        {sortedUsers.map((user) => (
          <li key={user.id}>
            <div>
              <div className=" default-container">
                <img alt="avatar" className="avatar" src={`/${user.avatarURL}`} />
                {user.name}
                <br />
                <br />
                Created questions: {user.questions.length}
                <br />
                +
                <br />
                Answered questions: {Object.keys(user.answers).length}
                <br />
                ---------------------------------------------
                <br />
                Total Score: {user.totalScore}
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps({ users }) {
  const usersList = Object.values(users)
  return {
    users: usersList,
    usersList
  }
}
export default connect(mapStateToProps)(LeaderBoard)
