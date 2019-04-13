import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../components/Search/SearchContainer';
import Filter from '../components/Filter/FilterContainer';
import RecipeList from '../components/Recipe/RecipeListContainer';

function Search(props) {
	return (
		<Grid container spacing={24}>
			<Grid item xs={12}>
				<Grid container spacing={24} justify="space-between" alignItems="center">
					<Grid item><Typography variant="h4">Find A Recipe</Typography></Grid>
					<Grid item><Typography>Some flavor...</Typography></Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<Filter category="recipes" />
			</Grid>
			<Grid item xs={12} sm={6} md={8}>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<SearchBar variant="outlined" />
					</Grid>
					<Grid item xs={12}>
						<RecipeList />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Search