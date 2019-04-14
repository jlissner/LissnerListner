import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _map from 'lodash/map';
import ItemsGroup from './ItemsGroup';

const styles = theme => ({
  header: {
    marginBottom: theme.spacing.unit * 2,
  },
})

function ItemizedList({ classes, groups, items, title }) {
  return (
    <React.Fragment>
      <Grid className={classes.header} container spacing={16} wrap="nowrap" alignItems="center">
        <Grid item xs={1}>
          <Divider />
          <Divider />
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Divider />
          <Divider />
        </Grid>
      </Grid>
      {
        _map(groups, (group, i) => (
            <ItemsGroup
              key={i}
              items={group[items]}
              title={group.title}

            />
          )
        )
      }
    </React.Fragment>
  );
};

export default withStyles(styles)(ItemizedList);
