import React from 'react';
import Fab from '@material-ui/core/Fab';

function RecipeFormButton({ onClick, openForm, text, Component, ...props }) {
  function handleClick() {
    openForm();
    onClick();
  }
    return <Component onClick={handleClick} {...props}>{text}</Component>
};

RecipeFormButton.defaultProps = {
  text: 'Add New Recipe',
  Component: Fab,
  onClick: () => {},
}

export default RecipeFormButton;
