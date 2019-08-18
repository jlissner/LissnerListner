import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import UserChangePassword from './UserChangePassword';
import UserFavorites from './UserFavoritesContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  activeTab: {
    background: theme.palette.secondary.dark,
  }
});

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderTab = () => {
    const { value } = this.state;

    switch (value) {
      case 1: {
        return <UserChangePassword />
      }
      case 0:
      default: {
        return <UserFavorites />
      }

    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Tabs
            value={value}
            onChange={this.handleChange}
            TabIndicatorProps={{
              className: classes.activeTab
            }}
          >
            <Tab label="Favorites" />
            <Tab label="Change Password" />
          </Tabs>
        </AppBar>
        {this.renderTab()}
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);