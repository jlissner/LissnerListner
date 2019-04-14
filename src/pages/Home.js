import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import _map from 'lodash/map';
import RecipeForm from '../components/Recipe/RecipeForm/RecipeFormContainer';
import Search from '../components/Search/SearchContainer';
import { sections } from '../data/recipeSections';


const styles = (theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    maxWidth: 1080,
    margin: '0 auto',
  },
  btn: {
    background: 'white',
    '&:hover': {
      background: theme.palette.grey[200],
    },
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

function Home({ classes, location, history }) {
  const searchPageUrl = `search${location.search}`;

  function submitSearch(evt) {
    evt.preventDefault();

    history.push(searchPageUrl)
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        component="form"
        onSubmit={submitSearch}
        alignItems="center"
        justify="center"
        spacing={16}
        className={classes.contentContainer}
      >
        <Grid item xs={12}>
          <Typography align="center" paragraph variant="h3">
            Lissner Cookbook
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Search variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            color="secondary"
            size="large"
            variant="contained"
            to={searchPageUrl}
            component={Link}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {
          _map(sections, ({label, value}) => (
            <Grid key={value} item xs={12} sm={6} md={4}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                className={classes.btn}
                component={Link}
                to={`search?filters=[{"category": "Section", "label": "${encodeURIComponent(value)}"}]`}
              >
                {label}
              </Button>
            </Grid>
          ))
        }
      </Grid>
      <RecipeForm
        text={<AddIcon />}
        buttonProps={{
          className: classes.addRecipe,
          color: 'primary',
        }}
      />
    </div>
  )
}

export default withStyles(styles)(Home)
