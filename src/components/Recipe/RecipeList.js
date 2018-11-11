import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/FilterList';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';

import _map from 'lodash/map';
import _find from 'lodash/find';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import RecipeCard from './RecipeCard';
import Filter from '../Filter/FilterContainer';
import Search from '../Search/SearchContainer';


const styles = (theme) => ({
  sectionTitle: {
    marginTop: theme.spacing.unit * 4,
    '&:first-of-type': {
      marginTop: 0,
    }
  },
  drawer: {
    width: 320,
    top: 64,
  },
  toolbarActions: {
    display: 'flex',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2,

  },
  searchContainer: {
    marginRight: theme.spacing.unit * 2,
  },
  filtersContainer: {
    background: 'white',
  },
  filterButton: {
    color: 'white',
  },
})

class RecipeList extends React.Component {
  constructor(props) {
    super(props);

    this.renderSection = this.renderSection.bind(this);
    this.renderDrawerContent = this.renderDrawerContent.bind(this);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    const { resetForm } = this.props;

    resetForm();

    this.actionRoot = document.getElementById('NavBarAction');
    this.actionRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.actionRoot.removeChild(this.el);
  }

  renderDrawerContent() {
    const { classes, closeDrawer } = this.props;

    return (
      <React.Fragment>
        <div className={classes.titleContainer}>
          <Typography color="inherit" variant="h5">Filters</Typography>
          <IconButton onClick={closeDrawer}><CancelIcon /></IconButton>
        </div>
        <div className={classes.filtersContainer}>
          <Filter category="recipes" />
        </div>
      </React.Fragment>
    )
  }

  renderSection(recipes, section) {
    const { classes, drawer, updateUser, activeUser, closeDrawer, toggleDrawer } = this.props;

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
    const { classes, closeDrawer, drawer, recipes, searchedRecipes, toggleDrawer } = this.props;
    const groupedRecipes = _groupBy(searchedRecipes, (r) => _find(r.tags, {category: 'Section'}).label);

    if (recipes.length === 0) {
      return <CircularProgress />
    }

    return (
      <React.Fragment>
        {
          ReactDOM.createPortal(
            <div className={classes.toolbarActions}>
              <div className={classes.searchContainer}>
                <Search category="recipes" />
              </div>
              <IconButton className={classes.filterButton} onClick={toggleDrawer}>
                <FilterIcon />
              </IconButton>
            </div>,
            this.el
          )
        }
        <Drawer
          anchor="right"
          classes={{paper: classes.drawer}}
          open={drawer}
          onClose={closeDrawer}
          variant="persistent"
        >
          {this.renderDrawerContent()}
        </Drawer>

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
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(RecipeList);
