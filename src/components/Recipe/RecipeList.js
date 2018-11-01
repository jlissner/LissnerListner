import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import _filter from 'lodash/filter';
import _lowerCase from 'lodash/lowerCase';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import RecipeCard from './RecipeCard';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
  search: {
    background: theme.palette.grey[200],
  },
  sectionTitle: {
    marginTop: theme.spacing.unit * 4,
  },
})

class RecipeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.getSearchedRecipes = this.getSearchedRecipes.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.renderSection = this.renderSection.bind(this);
  }

  componentDidMount() {
    const { recipes, getRecipes, resetForm } = this.props;

    if (recipes.length === 0) {
      getRecipes();
    }

    resetForm();
  }

  getSearchedRecipes() {
    const { search } = this.state;
    const { recipes } = this.props;

    if (!search) {
      return recipes
    }

    return _filter(recipes, (recipe) => _lowerCase(JSON.stringify(recipe)).indexOf(_lowerCase(search)) > -1)
  }

  updateSearch(evt) {
    this.setState({
      search: evt.target.value,
    })
  }

  renderSection(recipes, section) {
    const { classes } = this.props;

    if (!recipes) {
      return null;
    }

    return (
      <React.Fragment>
        <Grid item xs={12}>
        <Typography className={classes.sectionTitle} variant="h4">{section}</Typography>
        </Grid>
        {
          _map(_sortBy(recipes, 'title'), (r) => (
            <Grid item xs={12} key={r.Id}>
              <RecipeCard
                recipe={r}
              />
            </Grid>
          ))
        }
      </React.Fragment>
    )
  }

  render() {
    const { classes, recipes } = this.props;
    const { search } = this.state;
    const searchedRecipes = this.getSearchedRecipes();
    const groupedRecipes = _groupBy(searchedRecipes, (r) => _find(r.tags, {category: 'Section'}).label);

    if (recipes.length === 0) {
      return <CircularProgress />
    }

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" className={classes.search}>
            <InputLabel htmlFor="search-input" variant="outlined">Search</InputLabel>
            <OutlinedInput
              id="search-input"
              value={search}
              onChange={this.updateSearch}
              labelWidth={55}
              startAdornment={(
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )}
            />
          </FormControl>
        </Grid>

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
