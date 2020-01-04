import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListSubheader,
  Paper,
} from '@material-ui/core';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import FilterItem from './FilterItem';

const styles = (theme) => ({
  root: {
    '& + $root': {
      marginTop: theme.spacing(2),
    },
  },
  list: {
      width: '100%',
  }
});

function FilterSection({
  classes,
  filters,
  subCategory,
}) {
  const filtersToShow = _filter(filters, ({ checked, numberOfRecipes }) => numberOfRecipes || checked)

  if (filtersToShow.length === 0) {
    return false;
  } 

  return (
    <Paper className={classes.root}>
      <List
        className={classes.list}
        subheader={<ListSubheader disableSticky>{subCategory}</ListSubheader>}
      >
        {
          _map(filtersToShow, ({label, checked, numberOfRecipes}) => (
              <FilterItem
                key={label}
                label={label}
                checked={checked}
                numberOfRecipes={numberOfRecipes}
                subCategory={subCategory}
              />
            )
          )
        }
      </List>
    </Paper>
  );
};

export default withStyles(styles)(FilterSection);
