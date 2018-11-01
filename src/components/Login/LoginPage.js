import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Login from './Login'

const styles = (theme) => ({
  root: {
    margin: `${theme.spacing.unit * 2}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 320,
  },
})

const LoginPage = ({ classes }) => (
  <Paper className={classes.root} >
    <Login />
  </Paper>
)

export default withStyles(styles)(LoginPage)
