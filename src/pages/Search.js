import React, { useState } from 'react';
import {
	Hidden,
	withWidth,
	Grid,
	useMediaQuery,
	Collapse,
	IconButton,
	Typography
} from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchBar from '../components/Search/Search';
import Filter from '../components/Filter/Filter';
import Quotes from '../components/Quotes/Quotes';
import RecipeList from '../components/Recipe/RecipeList';

function Search({ location }) {
	const matches = useMediaQuery('(min-width:600px)');
	const [ showFilter, setShowFilters ] = useState(false);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Grid container spacing={3} justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}><Typography variant="h4">Find A Recipe</Typography></Grid>
					<Grid item xs={12} sm><Quotes /></Grid>
				</Grid>
			</Grid>
			<Hidden smUp>
				<Grid item xs={12}>
					<Grid container spacing={2} wrap="nowrap">
						<Grid item xs={12}>
							<SearchBar variant="outlined" />
						</Grid>
						<Grid item>
							<IconButton onClick={() => setShowFilters(!showFilter)}><FilterIcon/></IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Hidden>
			<Grid item xs={12} sm={6} md={4}>
				<Collapse in={matches || showFilter}>
					<Filter category="recipes" />
				</Collapse>
			</Grid>
			<Grid item xs={12} sm={6} md={8}>
				<Grid container spacing={3}>
					<Hidden only='xs'>
						<Grid item xs={12}>
							<SearchBar variant="outlined" />
						</Grid>
					</Hidden>
					<Grid item xs={12}>
						<RecipeList location={location} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default withWidth()(Search)