import React, { Component } from 'react';
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

class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  async toggleFavorite() {
    const { recipe, activeUser, updateUser, isFavorite } = this.props;
    const favorites = activeUser.favoriteRecipes;

    this.setState({ loading: true });

    await updateUser({
      Id: activeUser.Id,
      favoriteRecipes: ( isFavorite
        ? _without(favorites, recipe)
        : [...favorites, recipe]
      )
    });

    this.setState({ loading: false });
  }

  render() {
    const { classes, className, disabled, isFavorite } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <IconButton className={className} disabled={disabled}>
          <CircularProgress size={24} />
        </IconButton>
      )
    }

    return (
      <IconButton className={className} onClick={this.toggleFavorite} disabled={disabled}>
        {
          isFavorite
            ? <FavoriteIcon className={classes.isFavorite} />
            : <FavoriteBorderIcon />
        }
      </IconButton>
    );
  }
}

export default withStyles(styles)(Favorite);
