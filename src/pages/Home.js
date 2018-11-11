import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';
import RecipeList from '../components/Recipe/RecipeListContainer';
import RecipeForm from '../components/Recipe/RecipeForm/RecipeFormContainer';
import Filter from '../components/Filter/FilterContainer';
import Search from '../components/Search/SearchContainer';


const styles = (theme) => ({
  root: {
    position: 'relative',
  },
  addRecipe: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    zIndex: 1,
  },
  drawer: {
    width: 320,
    top: 64,
  },
  toolbarActions: {
    display: 'flex',
  },
  contentContainer: {
    height: '100%',
    overflow: 'hidden',
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

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid className={classes.contentContainer} container spacing={16}>
          <Grid item xs={12}>
            <Typography align="center" paragraph variant="h3">
              Lissner Cookbook
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <RecipeList />
          </Grid>
        </Grid>
        <RecipeForm
          text={<AddIcon />}
          buttonProps={{
            className: classes.addRecipe,
            color: 'primary',
            variant: 'fab',
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
