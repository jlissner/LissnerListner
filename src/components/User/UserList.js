import React, { useEffect, useMemo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy'
import { listUsers } from '../../lib/aws/cognito';

const styles = (theme) => ({
  loadingContainer: {
    padding: theme.spacing(2),
  },
})

function getAttributeValue(attributes, name) {
  const attribute = _find(attributes, { Name: name });

  return _get(attribute, 'Value');
}

function formatUserData({
  Attributes,
  UserCreatedDate,
  Username,
  UserStatus,
}) {
  const firstName = getAttributeValue(Attributes, 'preferred_username') ||
    getAttributeValue(Attributes, 'given_name');
  const lastName = getAttributeValue(Attributes, 'family_name');
  const email = getAttributeValue(Attributes, 'email');
  const name = firstName && lastName
    ? `${lastName}, ${firstName}`
    : email;

  return {
    id: Username,
    active: UserStatus === 'CONFIRMED',
    created: UserCreatedDate,
    attributes: Attributes,
    name
  }
}

function UserList({ classes }) {
  const [users, setUsers] = useState([]);
  const sortedUsers = useMemo(() => _sortBy(users, ['name']), [users]);

  useEffect(() => {
    listUsers()
      .then(data => {
        const formattedUsers = _map(data, formatUserData);

        setUsers(formattedUsers)
      })
      .catch(err => console.error(err));
  }, []);

  if (users.length === 0) {
    return (
      <Paper className={classes.loadingContainer}>
        <Grid container spacing={2} wrap="nowrap" alignItems="center">
          <Grid item>Loading Users...</Grid>
          <Grid item><CircularProgress /></Grid>
        </Grid>
      </Paper>
    )
  }

  return (
    <Paper>
      <List>
        {_map(sortedUsers, ({ id, name, active }) => (
          <ListItem key={id}>
            <ListItemText primary={name} secondary={active ? 'Active' : 'Inactive'} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default withStyles(styles)(UserList);
