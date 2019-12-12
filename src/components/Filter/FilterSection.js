import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListSubheader,
} from '@material-ui/core';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import FilterItem from './FilterItemContainer';

const styles = (theme) => ({
  root: {
    background: '#fff',
    '& + $root': {
      paddingTop: theme.spacing(2),
    },
  },
  list: {
      width: '100%',
  }
});

class FilterSection extends React.Component {
  render() {
    const { classes, filters, category, subCategory } = this.props;
    const filtersToShow = _filter(filters, ({ checked, numberOfRecipes }) => numberOfRecipes || checked)

    if (filtersToShow.length === 0) {
      return false;
    } 

    return (
      <div className={classes.root}>
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
                  category={category}
                />
              )
            )
          }
        </List>
      </div>
    );
  }
};

export default withStyles(styles)(FilterSection);
