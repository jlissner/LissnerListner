import React from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
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
  titleContainer: {
    position: 'relative',
  },
  title: {
    padding: `0 ${theme.spacing.unit * 5}px`,
  },
  description: {
    color: theme.palette.grey[800],
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
  subHeader: {
    fontSize: '.5em',
    color: theme.palette.grey[600],
    marginLeft: theme.spacing.unit,
    fontStyle: 'italic',
  },
  favorite: {
    position: 'absolute',
    top: 0,
    left: 0
  },
})

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    const { recipes, match, setForm } = this.props;
    this.recipe = _find(recipes, {recipeUrl: `/${match.params.recipe}`})

    if (this.recipe) {
      setForm(this.recipe)
    }


  }

  renderDescription(recipe) {
    const { classes } = this.props;

    if (!this.recipe.description) {
      return null;
    }

    return (
      <Typography variant="h4" align="center" className={classes.description}>{this.recipe.description}</Typography>
    )
  }

  render() {
    const { classes, recipes, match, user } = this.props;

    if (recipes.length === 0) {
      return <div className={classes.progress}><CircularProgress /></div>
    }

    if (!this.recipe) {
      return <Redirect to={`/404?missingPage=${match.url}`} />
    }

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} className={classes.titleContainer}>
            <Favorite className={classes.favorite} recipe={this.recipe.Id} />
            <Typography align="center" variant="h4" paragraph className={classes.title}>
              {this.recipe.title}
              {
                this.recipe.serves
                ? <span className={classes.subHeader}>{this.recipe.serves}</span>
                : null
              }
            </Typography>
            {this.renderDescription(this.recipe)}
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <ItemizedList title="Ingredients" groups={this.recipe.ingredients} items="ingredients" />

          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <ItemizedList title="Directions" groups={this.recipe.directions} items="steps" />
          </Grid>
          <Grid item xs={12}>
            <RecipeSummary recipe={this.recipe} />
          </Grid>
        </Grid>
        
        { this.recipe.createdBy === user.activeUser.Id || _includes(user.activeUser.roles, 'Admin')
          ? <RecipeForm
              text={<EditIcon />}
              buttonProps={{
                className: classes.editButton,
                color: 'primary',
                variant: 'fab',
              }}
            />
          : null
        }
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(RecipeDetail);