import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import _filter from 'lodash/filter';

const styles = (theme) => ({
  list: {
    background: theme.palette.secondary.main,
    "& span": {
      color: 'white',
    }
  },
})

function RecipeSummary({ classes, recipe }) {
  function getTags(category) {
    return _filter(recipe.tags, { category })
  }

  return (
    <List className={classes.list}>
      {
        recipe.serves
          ? <ListItem><ListItemText primary={`${recipe.serves}`} /></ListItem>
          : null
      }
      {
        recipe.time
          ? <ListItem><ListItemText primary={recipe.time} /></ListItem>
          : null
      }
      {
        getTags('Difficulty').length
          ? <ListItem><ListItemText primary={`Difficulty: ${getTags('Difficulty')[0].label}`} /></ListItem>
          : null
      }
      {
        getTags('Ethnicity').length
          ? <ListItem><ListItemText primary={`Ethnicity: ${getTags('Ethnicity').map(e => e.label).join(', ')}`} /></ListItem>
          : null
      }
      {
        recipe.note
          ? <ListItem><ListItemText primary={`NOTE: ${recipe.note}`}/></ListItem>
          : null
      }
    </List>
  )
}

export default withStyles(styles)(RecipeSummary);