import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
  toggleFavorite,
  isFavorite,
}) {
  const [loading, setLoading] = useState(false);


  async function clickHandler() {
    setLoading(true);

    toggleFavorite(recipe);
  }

  useEffect(() => {
    setLoading(false);
  }, [activeUser]);

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
      onClick={clickHandler}
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
  isFavorite: PropTypes.bool.isRequired,
  activeUser: PropTypes.shape().isRequired,
  recipe: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Favorite.defaultProps = {
  className: '',
  disabled: false,
}

export default withStyles(styles)(Favorite);
