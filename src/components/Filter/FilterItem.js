import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import _concat from 'lodash/concat';
import _filter from 'lodash/filter';
import CookbookContext from '../../context/CookbookContext';

const styles = (theme) => ({
  checked: {
    color: theme.palette.primary.main,
  },
});

function FilterItem({
  classes,
  checked,
  numberOfRecipes,
  label,
  subCategory,
}) {
  const [cookbook, setCookbook] = useContext(CookbookContext);
  const { filters } = cookbook;

  function handleClick() {
    const newFilters = checked
      ? _filter(filters, f => f.category !== subCategory && f.label !== label)
      : _concat(filters, { label, category: subCategory });

    console.log({ newFilters });

    setCookbook({
      filters: newFilters,
    });
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
