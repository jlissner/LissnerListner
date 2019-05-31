import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../Layout/LayoutContainer';

function SecuredApp({ login, logout, user, recipes, getRecipes, getTags }) {
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

SecuredApp.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  user: PropTypes.shape().isRequired,
}

export default SecuredApp;
