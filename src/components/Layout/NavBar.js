import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import LoginButton from '../Login/LoginButton';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  actionButton: {
    marginLeft: 'auto',
  },
  home: {
    marginRight: theme.spacing.unit,
  },
});

class NavBar extends React.PureComponent {
  render() {
    const { classes, user, logout } = this.props;

    return (
      <nav className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to='/'>
              <HomeIcon className={classes.home} />
              Lissner Cookbook
            </Button>

            {
              user
              ? <Button
                  color="inherit"
                  className={classes.actionButton}
                  onClick={logout}
                >
                  Logout
                </Button>
              : <LoginButton color="inherit" className={classes.actionButton} />
            }
          </Toolbar>
        </AppBar>
      </nav>
    )
  }
}

export default withStyles(styles)(NavBar);