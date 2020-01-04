import React from 'react';
import { useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { toggleFilter } from './FilterActions';

const styles = (theme) => ({
  checked: {
    color: theme.palette.primary.main,
  },
});

function FilterItem({
  classes,
  checked,
  label,
  numberOfRecipes,
  subCategory,
}) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(toggleFilter({ label, category: subCategory}))
  }

  return (
    <ListItem button onClick={handleClick}>
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
