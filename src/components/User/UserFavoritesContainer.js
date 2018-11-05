import { connect } from 'react-redux'
import _get from 'lodash/get'
import { actions as userActions } from './UserActions';
import UserFavorites from './UserFavorites';

const mapStateToProps = (state) => ({
  user: _get(state, 'user.activeUser'),
  recipes: state.recipes,
})

const mapActionsToProps = {
  ...userActions,
}

export default connect(mapStateToProps, mapActionsToProps)(UserFavorites);
