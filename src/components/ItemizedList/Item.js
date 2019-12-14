import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
import FormattedText from '../utils/FormattedText';

const styles = (theme) => ({
  checked: {
    color: green[500],
  },
  lineThrough: {
    textDecoration: 'line-through',
  },
});


function RecipeDirections({ classes, item }) {
  const [checked, setChecked] = useState(false)

  return (
    <ListItem button onClick={() => setChecked(!checked)}>
      <ListItemIcon>
        <CheckIcon className={checked ? classes.checked : ''} />
      </ListItemIcon>
      <ListItemText className={checked ? classes.lineThrough : ''} primary={<FormattedText text={item} />} />
    </ListItem>
  );
};

export default withStyles(styles)(RecipeDirections);
