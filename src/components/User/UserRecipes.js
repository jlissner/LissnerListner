import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import _filter from 'lodash/filter';

function UserRecipes() {
  const { activeUser } = useSelector(state => state.user);
  const { idPk } = activeUser;
  const recipes = useSelector(state => state.recipes);
  const userRecipes = useMemo(() => (
    _filter(recipes, ({ authorFk }) => authorFk === idPk)
  ), [idPk]);

  console.log({ userRecipes: userRecipes.length, recipes: recipes.length });

  return (
    <List>
      hi
    </List>
  );
}

export default UserRecipes;
