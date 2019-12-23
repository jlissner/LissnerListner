import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
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
import _sortBy from 'lodash/sortBy';
import makeName from '../utils/makeName';

const styles = (theme) => ({
  loadingContainer: {
    padding: theme.spacing(2),
  },
})

function UserList({ classes }) {
  const { users } = useSelector(state => state.user);
  const sortedUsers = useMemo(() => _sortBy(users, ['name']), [users]);

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
        {_map(sortedUsers, ({ idPk, ...user }) => (
          <ListItem key={idPk}>
            <ListItemText primary={makeName(user)} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default withStyles(styles)(UserList);
