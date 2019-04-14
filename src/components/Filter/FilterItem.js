import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import green from '@material-ui/core/colors/green';

const styles = (theme) => ({
  checked: {
    color: green[500],
  },
});

function FilterItem({ classes, checked, numberOfRecipes, toggleFilter, category, label, subCategory }) {
  const handleCheck = () => {
    toggleFilter({category, value: {label, category: subCategory}});
  }

  return (
    <ListItem button onClick={handleCheck} disabled={!numberOfRecipes}>
      <ListItemIcon>
        {
          checked
            ? <CheckBoxIcon className={classes.checked} />
            : <CheckBoxOutlineBlankIcon />
        }
      </ListItemIcon>
      <ListItemText inset primary={`${label} (${numberOfRecipes})`} />
    </ListItem>
  );
};

export default withStyles(styles)(FilterItem);
