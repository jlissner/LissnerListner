import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import _intersectionWith from 'lodash/intersectionWith';
import _get from 'lodash/get';
import _map from 'lodash/map';
import Favorite from '../Favorite/FavoriteContainer';

class UserFavorites extends Component {
  renderRecipes() {
    const { user, recipes } = this.props;
    const favoriteRecipes = _intersectionWith(recipes, user.favoriteRecipes, (a, b) => a.Id === b)

    return (
      <List>
        {_map(favoriteRecipes, recipe => (
          <ListItem button component={Link} to={recipe.recipeUrl} key={recipe.Id}>
            <ListItemIcon>
              <Favorite recipe={recipe.Id} disabled />
            </ListItemIcon>
            <ListItemText primary={recipe.title} />
          </ListItem>
        ))}
      </List>
    )
  }
  render() {
    const { user } = this.props;

    return (
      <Card>
        {
          _get(user, 'favoriteRecipes.length')
            ? this.renderRecipes()
            : (
              <CardContent>
                <Typography>
                  You currently don't have any favorite recipes.
                </Typography>
              </CardContent>
            )
        }
        
      </Card>
    );
  }
}

export default UserFavorites
