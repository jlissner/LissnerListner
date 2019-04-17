import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom'
import { withStyles }from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import { sections } from '../../data/recipeSections';
import Favorite from '../Favorite/FavoriteContainer';

const styles = {
  listItem: {
    transition: 'all .2s ease-out',
    transform: 'translateX(-16px)',
    opacity: 0,
    '&.loaded': {
      transform: 'translateX(0)',
      opacity: 1,
    }
  }
}

function SectionItem({ classes, recipe }) {
  const [className, setClassName] = useState('');

  useEffect(() => {
    process.nextTick(() => setClassName('loaded'));
  }, [])

  return (
    <ListItem className={[classes.listItem, className].join(' ')} button component={Link} to={recipe.recipeUrl}>
      <ListItemText primary={recipe.title} secondary={recipe.author} />
      <ListItemSecondaryAction>
        <Favorite recipe={recipe.Id} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const StyledSectionItem = withStyles(styles)(SectionItem)

function Section({ recipes, section }) {
  if (!recipes) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        title={section}
      />
      <List>
        {_map(recipes, (recipe) => <StyledSectionItem key={recipe.Id} recipe={recipe} />)}
      </List>
    </Card>
  )
}

function RecipeList({
  recipes,
  searchedRecipes,
}) {
  const sortedRecipes = useMemo(() => _sortBy(searchedRecipes, 'title'), [ searchedRecipes ]);
  const [numOfRecipesToLoad, setNumOfRecipesToLoad] = useState(1);
  const [loadRecipedTimeout, setLoadRecipesTimeout] = useState(0);
  const groupedRecipes = useMemo(() => _groupBy(sortedRecipes.slice(0, numOfRecipesToLoad), (r) => _find(r.tags, {category: 'Section'}).label), [searchedRecipes, numOfRecipesToLoad]);
  const MemoizedSections = useCallback(
    _map(sections, ({ label, value }) => (
      <Section
        key={value}
        recipes={groupedRecipes[value]}
        section={label}
      />
    )),
    [groupedRecipes]
  )

  useEffect(() => {
    if (numOfRecipesToLoad !== searchedRecipes.length) {
      setLoadRecipesTimeout(setTimeout(() => {
        setNumOfRecipesToLoad(numOfRecipesToLoad + 1)
      }))
    }
  }, [numOfRecipesToLoad])

  useEffect(() => {
    if (numOfRecipesToLoad > 10) {
      clearTimeout(loadRecipedTimeout);
      setNumOfRecipesToLoad(10)
    }
  }, [sortedRecipes])

  if (recipes.length === 0) {
    return <CircularProgress />
  }

  return MemoizedSections;
}

export default RecipeList;
