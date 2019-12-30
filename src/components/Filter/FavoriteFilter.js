import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import {
  List,
  ListSubheader,
  Paper,
} from '@material-ui/core';
import qs from 'query-string';
import { getIsFavorite } from '../Favorite/getFavoriteRecipes';
import FilterItem from './FilterItem';

const styles = (theme) => ({
  root: {
    background: '#fff',
    marginBottom: theme.spacing(2),
  },
  list: {
      width: '100%',
  },
});

function FavoriteFilter({ classes, location, history, numberOfRecipes }) {
	const parsedQueryString = qs.parse(location.search)
	const checked = getIsFavorite(location);
  const hide = !checked && !numberOfRecipes

	function handleClick() {
		parsedQueryString.favorite = !checked;

		history.push({search: qs.stringify(parsedQueryString)})
	}

  if (hide) {
    return false;
  }

	return (
		<Paper className={classes.root}>
			<List
        className={classes.list}
        subheader={<ListSubheader disableSticky>Favorites</ListSubheader>}
      >
				<FilterItem
					checked={checked}
					numberOfRecipes={numberOfRecipes}
					handleClick={handleClick}
					label="My Favorites"
				/>
			</List>
		</Paper>
	);
}

FavoriteFilter.propTypes = {
	classes: PropTypes.shape().isRequired,
	location: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  numberOfRecipes: PropTypes.number.isRequired,
}

export default withRouter(withStyles(styles)(FavoriteFilter));
