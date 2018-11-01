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
import NoPage from '../../pages/NoPage';
import NavBar from './NavBar'

const styles = (theme) => ({
  app: {
    background: theme.palette.grey[300],
    minHeight: '100vh',
  },
  authenticating: {
    margin: '0 auto',
    width: 40,
  },
  content: {
    maxWidth: 1600,
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
})

class Layout extends React.Component {
  renderApp = () => {
    const { classes } = this.props;
    
    return (
      <div className={classes.content}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/404' component={NoPage} />
          <Route path='/:recipe' component={RecipeDetail} />
        </Switch>
      </div>
    );
  }

  renderLander = () => {
    const { classes, isAuthenticating } = this.props;

    if (isAuthenticating) {
      return (
        <div className={classes.authenticating}>
          <CircularProgress />
        </div>
      )
    }

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

  render() {
    const { classes, user, logout } = this.props

    return (
      <div className={classes.app}>
        <NavBar user={user} logout={logout} />

        {
          user
          ? this.renderApp()
          : this.renderLander()
        }
        
        <ToastContainer autoClose={3000} />
      </div>
    )
  }
}

export default withStyles(styles)(Layout);