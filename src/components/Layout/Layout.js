import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core';
import UserContext, {
  getCurrentUser,
} from '../../context/UserContext';
import NavContext from '../../context/NavContext';
import CookbookContext, { fetchCookbook } from '../../context/CookbookContext';
import Secured from '../utils/Secured';
import Login from '../Login/Login';
import About from '../../pages/About';
import Admin from '../../pages/Admin';
import CookbookHome from '../../pages/CookbookHome';
import RecipeDetail from '../../pages/RecipeDetail';
import UserProfile from '../../pages/UserProfile';
import Articles from '../../pages/Articles';
import Search from '../../pages/Search';
import NoPage from '../../pages/NoPage';
import NavBar from './NavBar'
import Footer from './Footer'

const styles = (theme) => ({
  app: {
    background: theme.palette.grey[300],
    height: '100%',
    paddingTop: 64,
  },
  authenticating: {
    margin: `${theme.spacing(3)}px auto 0`,
    width: 200,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    height: '100%',
    overflow: 'auto',
    marginRight: 0,
    transition: `margin-right ${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.easeInOut}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  footerContainer: {
    width: '100%',
  },
  contentContainerOpen: {
    marginRight: 319,
    transition: `margin-right ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeInOut}`,
  },
  content: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: theme.spacing(4),
  },
  lander: {
    maxWidth: 400,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  '@global': {
    'html, body, #root': {
      height: '100%',
    }
  },
})

function Layout({
  classes,
}) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [user, setUser] = useContext(UserContext);
  const [{ name }, setCookbook] = useContext(CookbookContext);
  const nav = useContext(NavContext);

  useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res);
      setInitialLoad(false);
    });
  }, [])

  useEffect(() => {
    fetchCookbook().then(cookbook => setCookbook(cookbook))
  }, [])

  function renderApp() {
    if (!name) {
      return (
        <div className={classes.authenticating}>
          Loading Cookbook...
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={classes.content}>
        <Switch>
          <Route exact path='/' render={() => <Redirect to="/cookbook" />} />
          <Route exact path='/admin' render={() => <Secured component={<Admin />} roles={['Admin']} />} />
          <Route exact path='/cookbook' component={CookbookHome} />
          <Route exact path='/profile' component={UserProfile} />
          <Route path='/404' component={NoPage} />
          <Route path='/cookbook/about' component={About} />
          <Route path='/cookbook/articles' component={Articles} />
          <Route path='/cookbook/search' component={Search} />
          <Route path='/cookbook/:recipe' component={RecipeDetail} />

          <Route render={({ location }) => <Redirect to={`/404?missingPage=${location.pathname}`} />} />
        </Switch>
      </div>
    );
  }

  function renderLander() {
    return (
      <div className={classes.content}>
        <Paper elevation={1} className={classes.lander}>
          <Typography variant="h6" gutterBottom align="center">
            Lissner Family Website
          </Typography>
          <Divider className={classes.divider} />
          <Login variant="raised" color="primary" fullWidth />
        </Paper>
      </div>
    )
  }

  function renderContent() {
    return user.idPk
      ? renderApp()
      : renderLander()
  }

  if (initialLoad) {
    return (
      <div className={classes.authenticating}>
        Authenticating...
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={classes.app}>
      <NavBar />

      <div id="content-wrapper" className={`${classes.contentContainer} ${nav.open ? classes.contentContainerOpen : ''}`}>
        {renderContent()}

        <div className={classes.footerContainer}>
          <Footer />
        </div>
      </div>

      <ToastContainer autoClose={3000} />
    </div>
  )
}

Layout.propTypes = {
  classes: PropTypes.shape().isRequired,
}

export default withStyles(styles)(Layout);