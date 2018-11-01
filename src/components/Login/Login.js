import { connect } from 'react-redux'
import { actions } from '../User/UserActions'
import LoginComponent from './LoginComponent'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
