import React, { useEffect, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Hidden,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import _find from 'lodash/find';
import _includes from 'lodash/includes';
import ItemizedList from '../ItemizedList/ItemizedList';
import RecipeSummary from './RecipeSummary';
import RecipeFormButton from './RecipeForm/RecipeFormButtonContainer';
import Favorite from '../Favorite/FavoriteContainer';
import FormattedText from '../utils/FormattedText';

const styles = (theme) => ({
  description: {
    color: theme.palette.grey[700],
  },
  ingredients: {
    marginBottom: theme.spacing(5),
  },
  editButton: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  progress: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
  title: {
    marginRight: theme.spacing(1.5),
  },
  subtitle: {
    color: '#808080',
    fontSize: '1.5em',
    lineHeight: '1.5em',
  },
})

function RecipeDetailHeader({ classes, recipe }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1} wrap="nowrap">
          <Grid item>
            <Favorite recipe={recipe.Id} />
          </Grid>
          <Grid item>
            <Grid container alignItems="flex-end">
              <Grid item>
                <Typography className={classes.title} variant="h4">{recipe.title}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.subtitle} variant="subtitle1">{recipe.author}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {
          recipe.description
          ? <Typography variant="h6" className={classes.description}>
              <FormattedText text={recipe.description} />
            </Typography>
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
    const wrapper = document.getElementById('content-wrapper');

    wrapper.scrollTo({top: 0, behavior: 'smooth'})
  }, []);

  if (recipes.length === 0) {
    return <div className={classes.progress}><CircularProgress /></div>
  }

  if (!recipe) {
    return <Redirect to={`/404?missingPage=${match.url}`} />
  }

  return (
    <React.Fragment>
      <Grid container spacing={3} alignContent="stretch">
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
        ? <RecipeFormButton
            text={<EditIcon />}
            className={classes.editButton}
            color="primary"
            onClick={() => {
              setForm(recipe)
            }}
          />
        : null
      }
    </React.Fragment>
  )
}

export default withStyles(styles)(RecipeDetail);