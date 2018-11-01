import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import _filter from 'lodash/filter';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
  },
  note: {
    padding: theme.spacing.unit,
    color: 'white',
    background: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    margin: -theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 1,
  },
  list: {
    background: theme.palette.secondary.main,
    "& span": {
      color: 'white',
    }
  },
  quoteWrapper: {
    fontSize: 32,
    marginTop: theme.spacing.unit * 3,
    lineHeight: 1,
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
  },
  quote: {
    fontSize: '2em',
    lineHeight: 1,
    float: 'left',
    display: 'block',
    marginTop: -theme.spacing.unit * 2,
    '&:last-of-type': {
      float: 'right',
    },
  },
})

class RecipeSummary extends React.PureComponent {
  getTags(category) {
    const { recipe } = this.props;

    return _filter(recipe.tags, { category })
  }

  renderNote() {
    const { classes, recipe } = this.props;

    if (!recipe.note) {
      return null;
    }

    return (
      <Typography className={classes.quoteWrapper}>
        <span className={classes.quote}>&ldquo;</span>
        <span className={classes.quote}>&rdquo;</span>
        {recipe.note}
      </Typography>
    )
  }

  render() {
    const { classes, recipe } = this.props;

    return (
      <React.Fragment>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={8}>
              {this.renderNote()}
            </Grid>
            <Grid item xs={12} sm={4}>
              <List className={classes.list}>
                {recipe.serves && <ListItem><ListItemText color="inherit" primary={`Servers: ${recipe.serves}`} /></ListItem>}
                {recipe.time && <ListItem><ListItemText primary={recipe.time} /></ListItem>}
                {this.getTags('Difficulty') && <ListItem><ListItemText primary={`Difficulty: ${this.getTags('Difficulty')[0].label}`} /></ListItem>}
                {this.getTags('Ethnicity') && <ListItem><ListItemText primary={`Ethnicity: ${this.getTags('Ethnicity').map(e => e.label).join(', ')}`} /></ListItem>}
              </List>
            </Grid>
          </Grid>

        
        
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(RecipeSummary);