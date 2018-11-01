import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import _map from 'lodash/map';
import FilterItem from './FilterItemContainer';

const styles = (theme) => ({
  root: {
    '& + $root': {
      marginTop: theme.spacing.unit * 2,
    },
  },
});

class FilterSection extends React.Component {
  render() {
    const { classes, filters, category } = this.props;

    return (
      <Paper className={classes.root}>
        <List
          subheader={<ListSubheader disableSticky>{category}</ListSubheader>}
        >
          {
            _map(filters, ({label}) => (
                <FilterItem key={label} label={label} category={category}/>
              )
            )
          }
        </List>
      </Paper>
    );
  }
};

export default withStyles(styles)(FilterSection);
