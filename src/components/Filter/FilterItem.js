import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import green from '@material-ui/core/colors/green';
import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';

const styles = (theme) => ({
  checked: {
    color: green[500],
  },
});

class FilterItem extends React.Component {
  handleCheck = () => {
    const { toggleFilter, category, label, subCategory } = this.props;

    toggleFilter({category, value: {label, category: subCategory}});
  }

  render() {
    const { classes, checked, disabled, label } = this.props;

    return (
      <ListItem button onClick={this.handleCheck} disabled={disabled}>
        <ListItemIcon>
          {
            checked
              ? <CheckBoxIcon className={classes.checked} />
              : <CheckBoxOutlineBlankIcon />
          }
        </ListItemIcon>
        <ListItemText inset primary={label} />
      </ListItem>
    );
  }
};

export default withStyles(styles)(FilterItem);
