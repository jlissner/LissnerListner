import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import _filter from 'lodash/filter';

const styles = (theme) => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  accent: {
    display: 'block',
    position: 'absolute',
    margin: `${theme.spacing.unit * 10}px auto`,
    width: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderLeft: `3px solid ${theme.palette.grey[400]}`,
  },
  list: {
    background: theme.palette.secondary.main,
    width: '100%',
    maxWidth: 320,
    borderColor: theme.palette.grey[300],
    borderWidth: `${theme.spacing.unit * 2}px 0`,
    borderStyle: 'solid',

    "& span": {
      color: 'white',
    }
  },
  compact: {
    padding: 0,
    border: 'none',
  },
})

function RecipeSummary({ classes, compact, recipe }) {
  function getTags(category) {
    return _filter(recipe.tags, { category })
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.accent}></div>
      <List className={[classes.list, compact ? classes.compact : ''].join(' ')}>
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
            ? <ListItem><ListItemText primary={`Note: ${recipe.note}`}/></ListItem>
            : null
        }
      </List>
    </div>
  )
}

export default withStyles(styles)(RecipeSummary);