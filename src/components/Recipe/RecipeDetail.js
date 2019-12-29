import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Hidden,
  Grid,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import _find from 'lodash/find';
import _kebabCase from 'lodash/kebabCase';
import graphql from '../../lib/graphql';
import Comments from '../Comments/Comments';
import ItemizedList from '../ItemizedList/ItemizedList';
import Spacing from '../utils/Spacing';
import RecipeDetailHeader from './RecipeDetailHeader';
import RecipeSummary from './RecipeSummary';
import RecipeFormButton from './RecipeForm/RecipeFormButtonContainer';
import { getRecipes } from './RecipeActions';
import { setForm } from './RecipeForm/RecipeFormActions';

const styles = (theme) => ({
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
})

function RecipeDetail({
  classes,
  match,
}) {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const { activeUser } = useSelector(state => state.user);
  const recipe = useMemo(() => _find(recipes, ({ name }) => (
    _kebabCase(name) === match.params.recipe
  )), [recipes, match]);

  useEffect(() => {
    const wrapper = document.getElementById('content-wrapper');

    wrapper.scrollTo({top: 0, behavior: 'smooth'})
  }, []);

  async function submitComment(comment) {
    const body = {
      query: `
        mutation {
          createRecipeComment(input: {recipeId: "${recipe.idPk}", commentText: "${comment}"}) {
            clientMutationId
          }
        }
      `
    };

    await graphql(body);

    dispatch(getRecipes());
  }

  function deleteComment({ idPk }) {
    return async () => {
      const body = {
        query: `
          mutation {
            deleteUserCommentByIdPk(input: {idPk: "${idPk}"}) {
              clientMutationId
            }
          }
        `
      };

      await graphql(body);

      dispatch(getRecipes());
    }
  }

  async function editComment({ idPk, text }) {
    const body = {
      query: `
        mutation {
          updateUserCommentByIdPk(input: {idPk: "${idPk}", userCommentPatch: {commentText: "${text}"}}) {
            clientMutationId
          }
        }
      `
    };

    await graphql(body);

    dispatch(getRecipes());
  }

  if (recipes.length === 0) {
    return <div className={classes.progress}><CircularProgress /></div>
  }

  if (!recipe) {
    return <Redirect to={`/404?missingPage=${match.url}`} />
  }

  return (
    <>
      <Grid container spacing={3} alignContent="stretch">
        <Grid item xs={12}>
          <RecipeDetailHeader recipe={recipe} />
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
          <ItemizedList title="Directions" groups={recipe.directions} items="steps" ordered />
        </Grid>
        <Grid item xs={12}>
          <Spacing space={5} />
          <Comments
            comments={recipe.comments}
            onDelete={deleteComment}
            onSubmit={submitComment}
            onEdit={editComment}
          />
        </Grid>
      </Grid>

      { recipe.authorFk === activeUser.idPk || activeUser.isAdmin
        ? <RecipeFormButton
            text={<EditIcon />}
            className={classes.editButton}
            color="primary"
            onClick={() => {
              dispatch(setForm(recipe))
            }}
          />
        : null
      }
    </>
  )
}

RecipeDetail.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default withRouter(withStyles(styles)(RecipeDetail));