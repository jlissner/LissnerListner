import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import _map from 'lodash/map';
import FilterItem from './FilterItemContainer';

const styles = (theme) => ({
  root: {
    background: '#fff',
    '& + $root': {
      paddingTop: theme.spacing.unit * 2,
    },
  },
  list: {
      width: '100%',
  }
});

class FilterSection extends React.Component {
  render() {
    const { classes, filters, category, subCategory } = this.props;

    return (
      <div className={classes.root}>
        <List
          className={classes.list}
          subheader={<ListSubheader disableSticky>{subCategory}</ListSubheader>}
        >
          {
            _map(filters, ({label, checked, numberOfRecipes}) => (
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
