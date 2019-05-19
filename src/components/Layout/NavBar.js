import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import LoginButton from '../Login/LoginButton';
import RecipeForm from '../Recipe/RecipeForm/RecipeFormContainer';
import RecipeFormButton from '../Recipe/RecipeForm/RecipeFormButtonContainer';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  actions: {
    marginLeft: 'auto',
    display: 'flex',
  },
  home: {
    marginRight: theme.spacing.unit,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NavBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      menuAnchor: null,
      nav: false,
    }

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
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

  openNav() {
    this.setState({
      nav: true,
    })
  }

  closeNav() {
    this.setState({
      nav: false,
    })
  }

  renderLogin() {
    const { classes } = this.props;

    return <LoginButton color="inherit" className={classes.actions} />
  }
  renderUserActions() {
    const { classes, logout } = this.props;
    const { menuAnchor } = this.state;

    return (
      <div className={classes.actions}>
        <div id="NavBarAction"></div>
        <IconButton color="inherit" onClick={this.openMenu}>
          <PersonIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.closeMenu} component={Link} to="/profile">My Profile</MenuItem>
          <RecipeFormButton
            text="Add Recipe"
            onClick={this.closeMenu}
            Component={MenuItem}
          />
          <Divider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }

  render() {
    const { classes, user } = this.props;
    const { nav } = this.state;

    return (
      <nav className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <Button color="inherit" onClick={this.openNav}>
              <MenuIcon />
            </Button>
            <Button color="inherit" component={Link} to='/'>
              <Hidden only={['xs', 'sm']}>
                Lissner Family Website
              </Hidden>
            </Button>

            {
              user
              ? this.renderUserActions()
              : this.renderLogin()
            }
          </Toolbar>
        </AppBar>
        <Drawer
          onClose={this.closeNav}
          open={nav}
        >
          <List>
            {/*<ListItem button component={Link} to="/profile" onClick={this.closeNav}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText inset primary="Profile" />
            </ListItem>*/}
            <ListItem button component={Link} to="/" onClick={this.closeNav}>
              <ListItemIcon>
                <RestaurantMenuIcon />
              </ListItemIcon>
              <ListItemText inset primary="Cookbook" />
            </ListItem>
            <ListItem button component={Link} to="/about" onClick={this.closeNav}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText inset primary="About" />
            </ListItem>
          </List>
        </Drawer>
        <RecipeForm />
      </nav>
    )
  }
}

export default withStyles(styles)(NavBar);