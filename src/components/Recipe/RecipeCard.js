import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Favorite from '../Favorite/FavoriteContainer';

const styles = (theme) => ({
  card: {
    transition: 'background .18s ease-in-out',
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

class RecipeCard extends React.Component {
  render() {
    const {
      classes,
      recipe,
    } = this.props

    return (
        <Card className={classes.card}>
          <CardHeader
            title={recipe.title}
            subheader={`Author: ${recipe.author || 'Unknown'}`}
            action={
              <Favorite recipe={recipe.Id} />
            }
          />
          <CardContent>
            {
              recipe.description
                ? <Typography paragraph>
                    {recipe.description}
                  </Typography>
                : null
            }
            <Tags classes={classes} tags={recipe.tags} />
          </CardContent>
          <CardActions>
            <Button color="secondary" variant="contained" component={Link} to={recipe.recipeUrl}>
              Go To Recipe
            </Button>
          </CardActions>
        </Card>
    )
  }
}

RecipeCard.defaultProps = {
  to: '/'
}

export default withStyles(styles)(RecipeCard)