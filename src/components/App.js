import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Dashboard from './dashboard'
import QuestionPage from './questionPage'
import NewQuestion from './newQuestion'
import Nav from './nav'
import Login from './login'
import NotFound from './notFound'
import LeaderBoard from './leaderBoard'
import ProtectedRoute from './protectedRoute'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Nav />
            <Switch>
              <Route path="/" exact component={Login} />
              <ProtectedRoute path="/dashboard" exact component={Dashboard} />
              <ProtectedRoute path="/add" exact component={NewQuestion} />
              <ProtectedRoute path="/question/:id" component={QuestionPage} />
              <ProtectedRoute path="/leaderboard" component={LeaderBoard} />
              <Route path="/not-found" component={NotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

// function mapStateToProps({ authedUser }) {
//   return {
//     loading: authedUser === null
//   }
// }
export default connect()(App)
