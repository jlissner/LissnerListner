import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { toggleFavorite } from '../../globalState/user';

const styles = (theme) => ({
  isFavorite: {
    color: theme.palette.secondary.main,
  },
});

function Favorite({
  classes,
  className,
  disabled,
  recipe,
}) {
  const dispatch = useDispatch();
  const { activeUser } = useSelector(state => state.user);
  const isFavorite = activeUser.favorites.indexOf(recipe) > -1;
  const [loading, setLoading] = useState(false);


  async function clickHandler() {
    setLoading(true);

    dispatch(toggleFavorite(recipe));
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
  recipe: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Favorite.defaultProps = {
  className: '',
  disabled: false,
}

export default withStyles(styles)(Favorite);
