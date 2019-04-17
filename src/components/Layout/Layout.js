import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Login from '../Login/Login';
import Home from '../../pages/Home';
import RecipeDetail from '../../pages/RecipeDetail';
import UserProfile from '../../pages/UserProfile';
import About from '../../pages/About';
import Search from '../../pages/Search';
import NoPage from '../../pages/NoPage';
import NavBar from './NavBar'

const styles = (theme) => ({
  app: {
    background: theme.palette.grey[300],
    height: '100%',
    paddingTop: 64,
  },
  authenticating: {
    margin: `${theme.spacing.unit * 3}px auto 0`,
    width: 200,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    height: '100%',
    overflow: 'auto',
    marginRight: 0,
    transition: `margin-right ${theme.transitions.duration.leavingScreen}ms ${theme.transitions.easing.easeInOut}`
  },
  contentContainerOpen: {
    marginRight: 319,
    transition: `margin-right ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeInOut}`,
  },
  content: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: theme.spacing.unit * 4,
  },
  lander: {
    maxWidth: 400,
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  '@global': {
    'html, body, #root': {
      height: '100%',
    }
  },
})

class Layout extends React.Component {
  renderApp = () => {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/profile' component={UserProfile} />
          <Route path='/404' component={NoPage} />
          <Route path='/about' component={About} />
          <Route path='/search' component={Search} />
          <Route path='/:recipe' component={RecipeDetail} />
        </Switch>
      </div>
    );
  }

  renderLander = () => {
    const { classes } = this.props;

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

  renderContent = () => {
    const { classes, isLoading, user, isAuthenticating } = this.props
    const showLoader = user
      ? isLoading
      : isAuthenticating;

    if (showLoader) {
      return (
        <div className={classes.authenticating}>
          Authenticating...
          <CircularProgress />
        </div>
      )
    }

    return user
      ? this.renderApp()
      : this.renderLander()
  }

  render() {
    const { classes, drawer, user, logout } = this.props

    return (
      <div className={classes.app}>
        <NavBar user={user} logout={logout} />

        <div className={`${classes.contentContainer} ${drawer ? classes.contentContainerOpen : ''}`}>
          {this.renderContent()}
        </div>

        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}

export default withStyles(styles)(Layout);