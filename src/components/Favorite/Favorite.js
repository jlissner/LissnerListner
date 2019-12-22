import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import _without from 'lodash/without';
import UserContext, { saveUser } from '../../context/UserContext';

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
}) {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { favorites = [] } = user;
  const isFavorite = favorites.indexOf(recipe) > -1;

  async function toggleFavorite() {
    const newFavorites = isFavorite
      ? _without(favorites, recipe)
      : [...favorites, recipe];

    setLoading(true);

    await saveUser({
      favorites: newFavorites,
    });

    setUser({ favorites: newFavorites });

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
  disabled: PropTypes.bool,
  recipe: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Favorite.defaultProps = {
  className: '',
  disabled: false,
}

export default withStyles(styles)(Favorite);
