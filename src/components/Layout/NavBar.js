import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LoginButton from '../Login/LoginButton';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  actions: {
    marginLeft: 'auto',
  },
  home: {
    marginRight: theme.spacing.unit,
  },
});

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      menuAnchor: null,
    }

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu(e) {
    this.setState({
      menuAnchor: e.currentTarget,
    });
  }
  closeMenu() {
    this.setState({
      menuAnchor: null,
    });
  }

  renderLogin() {
    const { classes } = this.props;

    return <LoginButton color="inherit" className={classes.actions} />
  }
  renderActions() {
    const { classes, logout } = this.props;
    const { menuAnchor } = this.state;

    return (
      <div className={classes.actions}>
        <IconButton color="inherit" onClick={this.openMenu}>
          <PersonIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.closeMenu} component={Link} to="/profile">My Profile</MenuItem>
          <Divider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }

  render() {
    const { classes, user } = this.props;

    return (
      <nav className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to='/'>
              <HomeIcon className={classes.home} />
              Lissner Family Website
            </Button>

            {
              user
              ? this.renderActions()
              : this.renderLogin()
            }
          </Toolbar>
        </AppBar>
      </nav>
    )
  }
}

export default withStyles(styles)(NavBar);