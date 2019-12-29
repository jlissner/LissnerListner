import React from 'react';
import { useDispatch } from 'react-redux';
import { Fab } from '@material-ui/core';
import { openForm } from './RecipeFormActions';

function RecipeFormButton({ onClick, text, Component, ...props }) {
  const dispatch = useDispatch();

  function handleClick() {
    onClick();
    setTimeout(dispatch, 50, openForm());
  }
  
  return <Component onClick={handleClick} {...props}>{text}</Component>
};

RecipeFormButton.defaultProps = {
  text: 'Add New Recipe',
  Component: Fab,
  onClick: () => {},
}

export default RecipeFormButton;
