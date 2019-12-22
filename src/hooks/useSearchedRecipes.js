import React, { useContext, useMemo } from 'react';
import _filter from 'lodash/filter';
import _lowerCase from 'lodash/lowerCase';
import CookbookContext from '../context/CookbookContext';

function useSearchedRecipes() {
  const [ cookbook, setCookbook ] = useContext(CookbookContext);
  const { recipes, search } = cookbook;
  const searchedRecipes = useMemo(() => {    
    if (!search) {
      return recipes;
    }

    return _filter(recipes, (recipe) => {
      const words = _lowerCase(search).split(' ');
      const stringifiedRecipe = _lowerCase(JSON.stringify(recipe));
      const matchingWords = _filter(words, word => stringifiedRecipe.indexOf(word) > -1)

      return words.length === matchingWords.length
    })
  }, [recipes, search]);

  return searchedRecipes;
}

export default useSearchedRecipes;
