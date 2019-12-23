import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline } from '@material-ui/core';
import Layout from '../Layout/LayoutContainer';

function SecuredApp({ getCurrentUser, logout, user, recipes, getRecipes, getTags }) {
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ hasFetched, setHasFetched ] = useState(false);
  const { activeUser = {}, authenticating } = user;
  const { idPk } = activeUser;

  useEffect(() => {
    if (!authenticated && authenticating) {
      getCurrentUser();
    } else if (!authenticated && idPk) {
      setAuthenticated(true);
    }
  }, [authenticated, authenticating, getCurrentUser, idPk]);

  useEffect(() => {
    if (authenticated && !hasFetched) {
      getRecipes();
      getTags();
      setHasFetched(true);
    }
  }, [authenticated, hasFetched, getRecipes, getTags])

  return (
    <React.Fragment>
      <CssBaseline />
      <Layout user={idPk} logout={logout} isAuthenticating={authenticating} isLoading={Boolean(!recipes.length)} />
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
