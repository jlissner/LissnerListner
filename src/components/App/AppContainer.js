import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { actions as tagsActions } from '../Tags/TagsActions';
import { actions as recipeActions } from '../Recipe/RecipeActions'
import { actions as userActions } from '../User/UserActions'
import App from './App'

const mapStateToProps = (state) => ({
  recipes: state.recipes,
  tags: state.tags,
  user: state.user,
})

const mapDispatchToProps = {
  ...recipeActions,
  ...tagsActions,
  ...userActions,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
