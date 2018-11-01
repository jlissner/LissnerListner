import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { actions as userActions } from '../User/UserActions'
import App from './App'

const mapDispatchToProps = {
  ...userActions,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
