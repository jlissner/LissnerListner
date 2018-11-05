import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import RecipeCard from './RecipeCard';

const styles = (theme) => ({
  sectionTitle: {
    marginTop: theme.spacing.unit * 4,
    '&:first-of-type': {
      marginTop: 0,
    }
  },
})

class RecipeList extends React.Component {
  constructor(props) {
    super(props);

    this.renderSection = this.renderSection.bind(this);
  }

  componentDidMount() {
    const { resetForm } = this.props;

    resetForm();
  }

  renderSection(recipes, section) {
    const { classes, updateUser, activeUser } = this.props;

    if (!recipes) {
      return null;
    }

    return (
      <React.Fragment>
        <Grid className={classes.sectionTitle} item xs={12}>
        <Typography variant="h4">{section}</Typography>
        </Grid>
        {
          _map(_sortBy(recipes, 'title'), (r) => (
            <Grid item xs={12} key={r.Id}>
              <RecipeCard
                recipe={r}
                activeUser={activeUser}
                isFavorite={activeUser.favoriteRecipes.indexOf(r.Id) > -1}
                updateUser={updateUser}
              />
            </Grid>
          ))
        }
      </React.Fragment>
    )
  }

  render() {
    const { recipes, searchedRecipes } = this.props;
    const groupedRecipes = _groupBy(searchedRecipes, (r) => _find(r.tags, {category: 'Section'}).label);

    if (recipes.length === 0) {
      return <CircularProgress />
    }

    return (
      <Grid container spacing={16}>
        {this.renderSection(groupedRecipes.Appetizer, 'Appetizers')}
        {this.renderSection(groupedRecipes.Soup, 'Soup')}
        {this.renderSection(groupedRecipes.Salad, 'Salad')}
        {this.renderSection(groupedRecipes.Bread, 'Bread')}
        {this.renderSection(groupedRecipes['Lunch & Brunch'], 'Lunch & Brunch')}
        {this.renderSection(groupedRecipes.Vegetable, 'Vegetable')}
        {this.renderSection(groupedRecipes.Poultry, 'Poultry')}
        {this.renderSection(groupedRecipes['Meat & Fish'], 'Meat & Fish')}
        {this.renderSection(groupedRecipes.Desserts, 'Desserts')}
        {this.renderSection(groupedRecipes['Cookies & Bars'], 'Cookies & Bars')}
        {this.renderSection(groupedRecipes.Cakes, 'Cakes')}
        {this.renderSection(groupedRecipes.Pies, 'Pies')}
        {this.renderSection(groupedRecipes['Candies & Sweets'], 'Candies & Sweets')}
        {this.renderSection(groupedRecipes['Bits & Pieces'], 'Bits & Pieces')}
        
      </Grid>
    )
  }
}

export default withStyles(styles)(RecipeList);
