import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import UserChangePassword from './UserChangePassword';
import UserRecipes from './UserRecipes';
import UserDetails from './UserDetails';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: 1440,
  },
  activeTab: {
    background: theme.palette.secondary.dark,
  }
});

function UserProfile({ classes }) {
  const [value, setValue] = useState(0);

  function handleChange(event, value) {
    setValue(value);
  };

  function renderTab() {
    if (value) {
      return <UserChangePassword />;
    }

    return <UserDetails />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            className: classes.activeTab
          }}
        >
          <Tab label="Details" />
          <Tab label="Change Password" />
        </Tabs>
      </AppBar>
      {renderTab()}
      <UserRecipes/>
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);