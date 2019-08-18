import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { getAuthenticatedUser } from '../../lib/awsLib'
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
} from '@material-ui/core';
import LoaderButton from '../LoaderButton/LoaderButton'

const styles = theme => ({
  actions: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    fontWeight: 700,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
  },
  requestAccess: {
    marginLeft: 'auto',
  },
  modalContent: {
    position: 'fixed',
    top: '20%',
    width: 400,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  closeButton: {
    marginLeft: 'auto',
  },
  forgotPassword: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
});

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      open: false,
    }
  }

  get validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }

  openModal = () => {
    this.setState({
      open: true,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    this.setState({ isLoading: true })

    try {
      await getAuthenticatedUser(this.state.email, this.state.password)

      this.props.login()
      toast.success('Logged in')
    } catch (err) {
      console.error(err)

      toast.error(err.message)
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { classes } = this.props;
    const { open, email, password, isLoading } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Typography variant='h6' className={classes.title}>
            Sign In to Continue
          </Typography>

          <TextField
            fullWidth
            autoFocus
            id="email"
            label="Email"
            type="email"
            className={classes.textField}
            value={email}
            onChange={this.handleChange}
            variant="outlined"
            margin="dense"
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            className={classes.textField}
            value={password}
            onChange={this.handleChange}
            variant="outlined"
            margin="dense"
            helperText={<a className={classes.forgotPassword} href="https://users.lissner.io/forgotPassword?response_type=code&client_id=5ahk62ikatkc3emromsk5oc7ot&redirect_uri=https://lissner.io">Forgot your password?</a>}
          />
          <div className={classes.actions}>
            <LoaderButton
              className={classes.submitButton}
              disabled={!this.validateForm}
              type="submit"
              isLoading={isLoading}
              text="Login"
              loadingText="Logging in…"
            />
            <Button
              className={classes.requestAccess}
              onClick={this.openModal}
            >
              Request Access
            </Button>
          </div>
        </form>
        <Modal
          open={open}
          onClose={this.closeModal}
        >
          <Card className={classes.modalContent}>
            <CardContent>
              <Typography variant="h5" paragraph>Request Access</Typography>
              <Typography paragraph>
                In order to gain an account, <strong>send Joe an email
                requesting access</strong>. Make sure to explicity state
                which email address you want to sign in from.
              </Typography>

              <Typography paragraph>
                Within 24 hours (in most cases) you will recieve an
                email with a temporary password wich you will have to
                change on your first login.
              </Typography>

              <Typography>
                If you do not get any response in a reasonable time
                reach out to Joe directly.
              </Typography>
            </CardContent>
            <CardActions>
              <Button className={classes.closeButton} onClick={this.closeModal}>Close</Button>
            </CardActions>
          </Card>
        </Modal>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Login)
