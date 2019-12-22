import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Hidden,
  Menu,
  MenuItem,
  Button,
  IconButton,
} from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import InfoIcon from '@material-ui/icons/Info';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import _get from 'lodash/get';
import CookbookContext from '../../context/CookbookContext';
import NavContext from '../../context/NavContext';
import UserContext from '../../context/UserContext';
import LoginButton from '../Login/LoginButton';
import RecipeForm from '../Recipe/RecipeForm/RecipeForm';
import RecipeFormButton from '../Recipe/RecipeForm/RecipeFormButton';

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
    marginRight: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

function NavBar({
  classes,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [nav, setNav] = useState(false)
  const { idPk, isAdmin, logout } = useContext(UserContext);
  const { open } = useContext(NavContext);
  const { resetForm } = useContext(CookbookContext);

  function openMenu(e) {
    setMenuAnchor(e.currentTarget);
  }

  function closeMenu() {
    setMenuAnchor(null);
  }

  function openNav() {
    setNav(true)
  }

  function closeNav() {
    setNav(false)
  }

  function renderLogin() {
    return <LoginButton color="inherit" className={classes.actions} />
  }

  function renderUserActions() {
    return (
      <div className={classes.actions}>
        <div id="NavBarAction"></div>
        <IconButton color="inherit" onClick={openMenu}>
          <PersonIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
        >
          <MenuItem onClick={closeMenu} component={Link} to="/profile">My Profile</MenuItem>
          <RecipeFormButton
            text="Add Recipe"
            onClick={() => {
              closeMenu();
              resetForm();
            }}
            Component={MenuItem}
          />
          <Divider />
          {isAdmin && (
            [ // as an array instead of a fragment because material-ui menu doesnt like fragemnts
              <MenuItem key="admin" onClick={closeMenu} component={Link} to="/admin">Admin</MenuItem>,
              <Divider key="divider" />
            ]
          )}
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <nav className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Button color="inherit" onClick={() => open = true}>
            <MenuIcon />
          </Button>
          <Button color="inherit" component={Link} to='/'>
            <Hidden only={['xs', 'sm']}>
              Lissner Family Website
            </Hidden>
          </Button>

          {
            idPk
            ? renderUserActions()
            : renderLogin()
          }
        </Toolbar>
      </AppBar>
      <Drawer
        onClose={() => open = false}
        open={open}
      >
        <List>
          {/*<ListItem button component={Link} to="/profile" onClick={closeNav}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText inset primary="Profile" />
          </ListItem>*/}
          <ListItem button component={Link} to="/" onClick={closeNav}>
            <ListItemIcon>
              <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText inset primary="Cookbook" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={closeNav}>
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

NavBar.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(NavBar);