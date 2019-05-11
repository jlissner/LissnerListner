import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
	footer: {
		marginTop: theme.spacing.unit * 2,
		background: theme.palette.accent2.dark,
		color: theme.palette.accent2.light,
		padding: theme.spacing.unit * 5,
		paddingBottom: theme.spacing.unit * 2,
		paddingTop: theme.spacing.unit * 2,
	},
	listText: {
		color: 'inherit',
	}
})

function Footer({ classes }) {
	return (
		<div className={classes.footer}>
			<Grid container alignItems="flex-end" justify="space-between">
				<Grid item>
					<Typography variant="h6" color="inherit">
						Lissner Family Website
					</Typography>
					<List dense disablePadding>
						<ListItem button component={Link} to="/">
							<ListItemText classes={{ primary: classes.listText }} primary="Home" />
						</ListItem>
						<ListItem button component={Link} to="/about">
							<ListItemText classes={{ primary: classes.listText }} primary="About" />
						</ListItem>
					</List>
				</Grid>
				<Grid item>
					<Typography color="inherit">
						Made by Joe
					</Typography>
				</Grid>
			</Grid>
		</div>
	)
}

export default withStyles(styles)(Footer)