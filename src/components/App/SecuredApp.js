import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import Layout from '../Layout/Layout';
import { getSections } from '../../globalState/sections';
import { getTags } from '../../globalState/tags';
import { getRecipes } from '../../globalState/recipes';
import { getCurrentUser } from '../../globalState/user';

function SecuredApp() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const user = useSelector(state => state.user);
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ hasFetched, setHasFetched ] = useState(false);
  const { activeUser = {}, authenticating } = user;
  const { idPk } = activeUser;

  useEffect(() => {
    if (!authenticated && authenticating) {
      dispatch(getCurrentUser());
    } else if (!authenticated && idPk) {
      setAuthenticated(true);
    }
  }, [authenticated, authenticating, idPk, dispatch]);

  useEffect(() => {
    if (authenticated && !hasFetched) {
      dispatch(getRecipes());
      dispatch(getTags());
      dispatch(getSections());
      setHasFetched(true);
    }
  }, [authenticated, hasFetched, dispatch])

  return (
    <React.Fragment>
      <CssBaseline />
      <Layout user={idPk} isAuthenticating={authenticating} isLoading={Boolean(!recipes.length)} />
    </React.Fragment>
  )
}

export default SecuredApp;
