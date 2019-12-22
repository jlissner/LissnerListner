import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
})

class NoPage extends React.PureComponent {
  render() {
    const { classes } = this.props

    return (
      <Paper elevation={1} className={classes.root}>
        <Typography variant='h3' paragraph>404 - Nothing to See Here</Typography>
        <Typography>
          If you think you think there should be something here, let Joe know.
        </Typography>
      </Paper>
    )
  }
}

export default withStyles(styles)(NoPage);