import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom'
import { withStyles }from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import CookbookContext from '../../context/CookbookContext';
import useRecipeList from '../../hooks/useRecipeList';
import { sections } from '../../data/recipeSections';
import Favorite from '../Favorite/Favorite';

const sectionItemStyles = {
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

const sectionStyles = theme => ({
  section: {
    marginBottom: theme.spacing(3),
  }
})

function sortRecipesBySection(recipe) {
  const section = _find(recipe.tags, tag => tag.category === 'Section').label;

  switch (section) {
    case 'Appetizer': return 1
    case 'Soup': return 2
    case 'Salad': return 3
    case 'Bread': return 4
    case 'Lunch & Brunch': return 5
    case 'Vegetable': return 6
    case 'Poultry': return 7
    case 'Meat & Fish': return 8
    case 'Desserts': return 9
    case 'Cookies & Bars': return 10
    case 'Cakes': return 11
    case 'Pies': return 12
    case 'Candies & Sweets': return 13
    case 'Bits & Pieces': return 14
    default: return 15
  }

}

function SectionItem({ classes, recipe }) {
  const [className, setClassName] = useState('');
  const { additionalAttributes, idPk, name } = recipe;
  const { author, recipeUrl } = additionalAttributes;

  useEffect(() => {
    const loadedTimeout = setTimeout(() => setClassName('loaded'), 100);

    return () => clearTimeout(loadedTimeout)
  }, [])

  return (
    <ListItem className={[classes.listItem, className].join(' ')} button component={Link} to={`/cookbook${recipeUrl}`}>
      <ListItemText primary={name} secondary={author} />
      <ListItemSecondaryAction>
        <Favorite recipe={idPk} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const StyledSectionItem = withStyles(sectionItemStyles)(SectionItem)

function Section({ classes, recipes, section }) {
  if (!recipes) {
    return null;
  }

  return (
    <Card className={classes.section}>
      <CardHeader
        title={section}
      />
      <List>
        {_map(recipes, (recipe) => <StyledSectionItem key={recipe.idPk} recipe={recipe} />)}
      </List>
    </Card>
  )
}

const StyledSection = withStyles(sectionStyles)(Section)

function RecipeList({ location }) {
  const [ cookbook, setCookbook ] = useContext(CookbookContext);
  const { recipes } = cookbook;
  const recipeList = useRecipeList(location);
  const sortedRecipes = useMemo(() => _sortBy(recipeList, [sortRecipesBySection, 'title']), [ recipeList ]);
  const [numOfRecipesToLoad, setNumOfRecipesToLoad] = useState(1);
  const [, setLoadRecipesTimeout] = useState(0);
  const groupedRecipes = useMemo(() => (
      _groupBy(sortedRecipes.slice(0, numOfRecipesToLoad), (r) => _find(r.tags, {category: 'Section'}).label)
    ), [numOfRecipesToLoad, sortedRecipes]);
  const MemoizedSections = useCallback(
    _map(sections, ({ label, value }) => (
      <StyledSection
        key={value}
        recipes={groupedRecipes[value]}
        section={label}
      />
    )),
    [groupedRecipes]
  )

  useEffect(() => {
    if (numOfRecipesToLoad < recipeList.length) {
      const incrementBy = numOfRecipesToLoad < 10 ? 1 : 20
      const loadedTimeout = setTimeout(() => {
        setNumOfRecipesToLoad(numOfRecipesToLoad + incrementBy)
      }, 100)

      setLoadRecipesTimeout(loadedTimeout)

      return () => clearTimeout(loadedTimeout);
    }
  }, [numOfRecipesToLoad, recipeList.length])

  useEffect(() => {
    setLoadRecipesTimeout(prevLoadRecipedTimeout => clearTimeout(prevLoadRecipedTimeout));
    setNumOfRecipesToLoad(prevNumOfRecipesToLoad => prevNumOfRecipesToLoad > 10 ? 10 : prevNumOfRecipesToLoad + 1)
  }, [sortedRecipes])

  if (recipes.length === 0) {
    return <CircularProgress />
  }

  return MemoizedSections;
}

export default RecipeList;
