import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  render() {
    const { user, authedUser } = this.props
    const avatar = user ? user.avatarURL : null
    const name = user ? user.name : ''
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/dashboard" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" exact activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" exact activeClassName="active">
              Leader Board
            </NavLink>
          </li>
          {authedUser && (
            <li>
              <NavLink to="/dashboard" exact activeClassName="active">
                <div className="nav-user">
                  <h5>hello {name}</h5>
                  <img src={avatar} alt={`Avatar of ${authedUser}`} className="nav-avatar" />
                </div>
              </NavLink>
              <Link to="/">
                <div>Logout</div>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(Nav)
