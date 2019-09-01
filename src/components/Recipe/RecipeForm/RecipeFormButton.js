import React from 'react';
import { Fab } from '@material-ui/core';

function RecipeFormButton({ onClick, openForm, text, Component, ...props }) {
  function handleClick() {
    onClick();
    setTimeout(openForm, 50);
  }
    return <Component onClick={handleClick} {...props}>{text}</Component>
};

RecipeFormButton.defaultProps = {
  text: 'Add New Recipe',
  Component: Fab,
  onClick: () => {},
}

export default RecipeFormButton;
