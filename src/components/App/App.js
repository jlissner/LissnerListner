import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import _get from 'lodash/get';
import Layout from '../Layout/LayoutContainer';

function App({ login, logout, user, recipes, getRecipes, tags, getTags }) {
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ hasFetched, setHasFetched ] = useState(false);
  const { activeUser = {}, authenticating } = user;
  const { Id } = activeUser;

  useEffect(() => {
    if (!authenticated && authenticating) {
      login();
    } else if (!authenticated && Id) {
      setAuthenticated(true);
    }
  });

  useEffect(() => {
    if (authenticated && !hasFetched) {
      getRecipes();
      getTags();
      setHasFetched(true);
    }
  })

  return (
    <React.Fragment>
      <CssBaseline />
      <Layout user={Id} logout={logout} isAuthenticating={authenticating} isLoading={Boolean(!recipes.length)} />
    </React.Fragment>
  )
}

/*
class App extends PureComponent {
  componentDidMount() {
    const { login } = this.props;

    login();
  }

  componentDidUpdate() {
    const { user, recipes, getRecipes, tags, getTags } = this.props;
    const Id = _get(user, 'activeUser.Id')

    if (Id && recipes.length === 0) {
      getRecipes();      
    }

    if (Id && tags.length === 0) {
      getTags();      
    }
  }

  render() {
    const { user, logout, recipes } = this.props;
    const Id = _get(user, 'activeUser.Id')

    return (
      <React.Fragment>
        <CssBaseline />
        <Layout user={Id} logout={logout} isAuthenticating={user.authenticating} isLoading={Boolean(!recipes.length)} />
      </React.Fragment>
    );
  }
}
*/
export default App;
