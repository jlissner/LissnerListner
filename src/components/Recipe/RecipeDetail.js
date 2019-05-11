import React, { useEffect, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import _find from 'lodash/find';
import _includes from 'lodash/includes';
import ItemizedList from '../ItemizedList/ItemizedList';
import RecipeSummary from './RecipeSummary';
import RecipeForm from './RecipeForm/RecipeFormContainer';
import Favorite from '../Favorite/FavoriteContainer';

const styles = (theme) => ({
  description: {
    color: theme.palette.grey[700],
  },
  ingredients: {
    marginBottom: theme.spacing.unit * 5,
  },
  editButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
  progress: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
  },
})

function RecipeDetailHeader({ classes, recipe }) {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Grid container spacing={8} wrap="nowrap">
          <Grid item>
            <Favorite recipe={recipe.Id} />
          </Grid>
          <Grid item>
            <Typography variant="h4">{recipe.title}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {
          recipe.description
          ? <Typography variant="h6" className={classes.description}>{recipe.description}</Typography>
          : null
        }
      </Grid>
    </Grid>
  )
}

function RecipeDetail({
  classes,
  recipes,
  match,
  setForm,
  resetForm,
  user,
}) {
  const recipe = useMemo(() => _find(recipes, {recipeUrl: `/${match.params.recipe}`}), [recipes, match]);

  useEffect(() => {
    setForm(recipe)

    return () => {
      resetForm()
    }
  }, [recipe])


  if (recipes.length === 0) {
    return <div className={classes.progress}><CircularProgress /></div>
  }

  if (!recipe) {
    return <Redirect to={`/404?missingPage=${match.url}`} />
  }

  return (
    <React.Fragment>
      <Grid container spacing={24} alignContent="stretch">
        <Grid item xs={12}>
          <RecipeDetailHeader classes={classes} recipe={recipe} />
        </Grid>
        <Hidden smUp>
          <Grid item xs={12}>
            <RecipeSummary compact recipe={recipe} />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={7} className={classes.ingredients}>
          <ItemizedList title="Ingredients" groups={recipe.ingredients} items="ingredients" />
        </Grid>
        <Hidden only="xs">
          <Grid item sm={5} className={classes.ingredients}>
            <RecipeSummary recipe={recipe} />
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <ItemizedList title="Directions" groups={recipe.directions} items="steps" />
        </Grid>
      </Grid>

      { recipe.createdBy === user.activeUser.Id || _includes(user.activeUser.roles, 'Admin')
        ? <RecipeForm
            text={<EditIcon />}
            className={classes.editButton}
            color="primary"
          />
        : null
      }
    </React.Fragment>
  )
}

export default withStyles(styles)(RecipeDetail);