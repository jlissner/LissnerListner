import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import {
  List,
  ListSubheader,
} from '@material-ui/core';
import qs from 'query-string';
import { getIsFavorite } from '../Favorite/getFavoriteRecipes';
import FilterItem from './FilterItem';

const styles = (theme) => ({
  root: {
    background: '#fff',
    '& + $root': {
      paddingTop: theme.spacing(2),
    },
  },
  list: {
      width: '100%',
  },
});

function FavoriteFilter({ classes, location, history, numberOfRecipes }) {
	const parsedQueryString = qs.parse(location.search)
	const favorite = getIsFavorite(location);

	function handleClick() {
		parsedQueryString.favorite = !favorite;

		history.push({search: qs.stringify(parsedQueryString)})
	}

	return (
		<div className={classes.root}>
			<List className={classes.list}>
				<ListSubheader>Favorites</ListSubheader>

				<FilterItem
					checked={favorite}
					numberOfRecipes={numberOfRecipes}
					handleClick={handleClick}
					label="My Favorites"
				/>
			</List>
		</div>
	);
}

FavoriteFilter.propTypes = {
	classes: PropTypes.shape().isRequired,
	location: PropTypes.shape().isRequired,
}

export default withRouter(withStyles(styles)(FavoriteFilter));
