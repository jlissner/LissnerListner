import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RecipeList from '../components/Recipe/RecipeListContainer';
import RecipeForm from '../components/Recipe/RecipeForm/RecipeFormContainer';
import Filter from '../components/Filter/FilterContainer';

const styles = (theme) => ({
  addRecipe: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
  }
})

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={4}>
          <Filter />
        </Grid>
        <Grid item xs={8}>
          <RecipeForm
            text={<AddIcon />}
            buttonProps={{
              className: classes.addRecipe,
              color: 'primary',
              variant: 'fab',
            }}
          />
          <RecipeList />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Home)
