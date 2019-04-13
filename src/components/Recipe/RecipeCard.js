import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import Favorite from '../Favorite/FavoriteContainer';
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'
import red from '@material-ui/core/colors/red'

const styles = (theme) => ({
  card: {
    transition: 'background .18s ease-in-out',
  },
  easy: {
    borderLeft: `${theme.spacing.unit}px solid ${green[500]}`,
  },
  medium: {
    borderLeft: `${theme.spacing.unit}px solid ${yellow[500]}`,
  },
  hard: {
    borderLeft: `${theme.spacing.unit}px solid ${red[500]}`,
  },
  isFavorite: {
    color: theme.palette.secondary.main,
  },
  pic: {
    height: 0,
    paddingTop: '56.25%',
  },
  goToRecipe: {
    marginLeft: 'auto',
  },
  tags: {
    marginBottom: theme.spacing.unit,
  },
})

const Tags = ({tags, classes}) => tags
  ? (<Grid className={classes.tags} container spacing={8}>
      {tags.map(tag => <Grid item key={tag.label}><Chip className={classes.tag} label={tag.label} /></Grid>)}
    </Grid>)
  : null

function RecipeCard({ classes, recipe }) {
  const { tags } = recipe;
  const difficulty = _find(tags, { category: 'Difficulty' }).label.toLowerCase();
  const filteredTags = _filter(tags, ({ category }) => category !== 'Difficulty')

  return (
    <React.Fragment>
      <ListItemIcon>
        <Favorite recipe={recipe.Id} />
      </ListItemIcon>
      <ListItemText component={Link} to={recipe.recipeUrl} primary={recipe.title} secondary={recipe.author} />
    </React.Fragment>
  )
}

RecipeCard.defaultProps = {
  to: '/'
}

export default withStyles(styles)(RecipeCard)

// <Card className={[classes.card, classes[difficulty]].join(' ')}>
//         <CardHeader
//           title={recipe.title}
//           subheader={recipe.author || 'Unknown'}
//           action={
//             <Favorite recipe={recipe.Id} />
//           }
//         />
//         <CardContent component={Link} to={recipe.recipeUrl}>
//           {
//             recipe.description
//               ? <Typography paragraph>
//                   {recipe.description}
//                 </Typography>
//               : null
//           }
//           <Tags classes={classes} tags={filteredTags} />
//         </CardContent>
//       </Card>