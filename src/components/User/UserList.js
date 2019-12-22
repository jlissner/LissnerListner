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
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy'

const styles = (theme) => ({
  loadingContainer: {
    padding: theme.spacing(2),
  },
})

function UserList({ classes }) {
  const [users, setUsers] = useState([]);
  const sortedUsers = useMemo(() => _sortBy(users, ['name']), [users]);

  useEffect(() => {
    // TODO: fetch user list
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
