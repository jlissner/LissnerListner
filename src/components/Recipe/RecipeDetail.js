import React from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import _find from 'lodash/find';
import ItemizedList from '../ItemizedList/ItemizedList';
import RecipeSummary from './RecipeSummary';
import RecipeForm from './RecipeForm/RecipeFormContainer';

const styles = (theme) => ({
  editButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  },
  progress: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
  },
  subHeader: {
    fontSize: '.5em',
    color: theme.palette.grey[600],
    marginLeft: theme.spacing.unit,
    fontStyle: 'italic',
  }
})

class RecipeDetail extends React.Component {
  componentDidMount() {
    const { recipes, getRecipes } = this.props;
    
    if (recipes.length === 0) {
      getRecipes();
    }
  }

  getRecipe = () => {
    const { recipes, match, setForm } = this.props;
    const recipe = _find(recipes, {recipeUrl: `/${match.params.recipe}`})

    if (recipe) {
      setForm(recipe)
    }

    return recipe;
  }

  renderDescription(recipe) {
    if (!recipe.description) {
      return null;
    }

    return (
      <Typography variant="subheading" align="center">{recipe.description}</Typography>
    )
  }

  render() {
    const { classes, recipes, match } = this.props;

    if (recipes.length === 0) {
      return <div className={classes.progress}><CircularProgress /></div>
    }

    const recipe = this.getRecipe();

    if (!recipe) {
      return <Redirect to={`/404?missingPage=${match.url}`} />
    }

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4" paragraph>
              {recipe.title}
              {
                recipe.serves
                ? <span className={classes.subHeader}>{recipe.serves}</span>
                : null
              }
            </Typography>
            {this.renderDescription(recipe)}
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <ItemizedList title="Ingredients" groups={recipe.ingredients} items="ingredients" />

          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <ItemizedList title="Directions" groups={recipe.directions} items="steps" />
          </Grid>
          <Grid item xs={12}>
            <RecipeSummary recipe={recipe} />
          </Grid>
        </Grid>

        <RecipeForm
          text={<EditIcon />}
          buttonProps={{
            className: classes.editButton,
            color: 'primary',
            variant: 'fab',
          }}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(RecipeDetail);