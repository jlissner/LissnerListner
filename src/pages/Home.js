import React from 'react';
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
  },
  searchContainer: {
    padding: theme.spacing.unit * 2,

  },
  filtersContainer: {
    background: 'white',
  },
  filterButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }

    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  openDrawer() {
    this.setState({
      open: true,
    });
  }

  closeDrawer() {
    this.setState({
      open: false,
    });
  }
  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <IconButton className={classes.filterButton} onClick={this.openDrawer}>
          <FilterIcon />
        </IconButton>
        <Drawer
          classes={{paper: classes.drawer}}
          open={open}
          onClose={this.closeDrawer}
        >
          <div className={classes.searchContainer}>
            <Search category="recipes" />
          </div>
          <div className={classes.filtersContainer}>
            <Filter category="recipes" />
          </div>
        </Drawer>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography align="center" paragraph variant="h3">
              Lissner Cookbook
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
      </div>
    )
  }
}

export default withStyles(styles)(Home)
