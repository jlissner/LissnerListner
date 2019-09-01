import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const styles = (theme) => ({
  checked: {
    color: theme.palette.primary.main,
  },
});

function FilterItem({ classes, checked, numberOfRecipes, handleClick, label }) {
  return (
    <ListItem button onClick={handleClick} disabled={!numberOfRecipes && !checked}>
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
