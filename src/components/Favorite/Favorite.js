import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import _without from 'lodash/without';


const styles = (theme) => ({
  isFavorite: {
    color: theme.palette.secondary.main,
  },
})

function Favorite({
  classes,
  className,
  disabled,
  recipe,
  activeUser,
  updateUser,
  isFavorite,
}) {
  const [loading, setLoading] = useState(false);

  async function toggleFavorite() {
    const favorites = activeUser.favoriteRecipes;
    const newFavorites = isFavorite
      ? _without(favorites, recipe)
      : [...favorites, recipe];

    setLoading(true);

    await updateUser({
      Id: activeUser.Id,
      favoriteRecipes: newFavorites,
    });

    setLoading(false);
  }

  if (loading) {
    return (
      <IconButton className={className} disabled={disabled} data-testid="loading">
        <CircularProgress size={24} />
      </IconButton>
    )
  }

  return (
    <IconButton
      className={className}
      onClick={toggleFavorite}
      disabled={disabled}
      data-testid="loaded"
    >
      {
        isFavorite
          ? <FavoriteIcon className={classes.isFavorite} data-testid="is-favorite" />
          : <FavoriteBorderIcon data-testid="not-favorite" />
      }
    </IconButton>
  );
}

Favorite.propTypes = {
  classes: PropTypes.shape().isRequired,
  disabled: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  activeUser: PropTypes.shape().isRequired,
  recipe: PropTypes.number.isRequired,
  updateUser: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Favorite.defaultProps = {
  className: '',
}

export default withStyles(styles)(Favorite);
