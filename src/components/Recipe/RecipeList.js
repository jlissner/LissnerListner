import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import { sections } from '../../data/recipeSections';
import Favorite from '../Favorite/FavoriteContainer';

function Section({ recipes, section, history }) {
  if (!recipes) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        title={section}
      />
      <List>
        {
          _map(_sortBy(recipes, 'title'), (recipe) => (
            <ListItem button key={recipe.Id} component={Link} to={recipe.recipeUrl}>
              <ListItemIcon>
                <Favorite recipe={recipe.Id} />
              </ListItemIcon>
              <ListItemText primary={recipe.title} secondary={recipe.author} />
            </ListItem>
          ))
        }
      </List>
    </Card>
  )
}


function RecipeList({
  resetForm,
  recipes,
  searchedRecipes,
  history,
}) {
  const groupedRecipes = _groupBy(searchedRecipes, (r) => _find(r.tags, {category: 'Section'}).label);

  useEffect(() => {
    resetForm();
  }, [])


  if (recipes.length === 0) {
    return <CircularProgress />
  }

  return (
    _map(sections, ({ label, value }) => (
      <Section
        key={value}
        recipes={groupedRecipes[value]}
        section={label}
        history={history}
      />
    ))
  )
}

export default RecipeList;
