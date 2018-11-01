import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import _map from 'lodash/map';
import Item from './Item';

const styles = (theme) => ({
  root: {
    '& + $root': {
      marginTop: theme.spacing.unit * 2,
    },
  },
});

class ItemsGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    }
  }

  toggleChecked = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }

  render() {
    const { classes, items, title } = this.props;

    return (
      <Paper className={classes.root}>
        <List
          subheader={<ListSubheader disableSticky>{title}</ListSubheader>}
        >
          {
            _map(items, (item) => (
                <Item key={item} item={item}/>
              )
            )
          }
        </List>
      </Paper>
    );
  }
};

export default withStyles(styles)(ItemsGroup);
