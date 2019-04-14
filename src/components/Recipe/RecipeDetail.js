import React, { useEffect, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
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
  root: {
    maxWidth: 1080,
    width: '100%',
    margin: '0 auto',
  },
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
    <Grid container spacing={24} alignItems="center">
      <Grid item xs={12} md={7}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Grid container spacing={8} wrap="nowrap">
              <Grid item>
                <Favorite recipe={recipe.Id} />
              </Grid>
              <Grid item>
                <Typography variant="h3">{recipe.title}</Typography>
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
      </Grid>
      <Grid item xs={12} md={5}>
        <RecipeSummary recipe={recipe} />
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
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <RecipeDetailHeader classes={classes} recipe={recipe} />
        </Grid>
        <Grid item xs={12} className={classes.ingredients}>
          <ItemizedList title="Ingredients" groups={recipe.ingredients} items="ingredients" />
        </Grid>
        <Grid item xs={12}>
          <ItemizedList title="Directions" groups={recipe.directions} items="steps" />
        </Grid>
      </Grid>

      { recipe.createdBy === user.activeUser.Id || _includes(user.activeUser.roles, 'Admin')
        ? <RecipeForm
            text={<EditIcon />}
            buttonProps={{
              className: classes.editButton,
              color: 'primary',
            }}
          />
        : null
      }
    </div>
  )
}

export default withStyles(styles)(RecipeDetail);