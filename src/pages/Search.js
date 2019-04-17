import React, { useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchBar from '../components/Search/SearchContainer';
import Filter from '../components/Filter/FilterContainer';
import RecipeList from '../components/Recipe/RecipeListContainer';

function Search() {
	const matches = useMediaQuery('(min-width:600px)');
	const [ showFilter, setShowFilters ] = useState(false);

	return (
		<Grid container spacing={24}>
			<Grid item xs={12}>
				<Grid container spacing={24} justify="space-between" alignItems="center">
					<Grid item><Typography variant="h4">Find A Recipe</Typography></Grid>
					{/*<Grid item><Typography>Some flavor...</Typography></Grid>*/}
				</Grid>
			</Grid>
			<Hidden smUp>
				<Grid item xs={12}>
					<Grid container spacing={16} wrap="nowrap">
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
				<Grid container spacing={24}>
					<Hidden only='xs'>
						<Grid item xs={12}>
							<SearchBar variant="outlined" />
						</Grid>
					</Hidden>
					<Grid item xs={12}>
						<RecipeList />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default withWidth()(Search)