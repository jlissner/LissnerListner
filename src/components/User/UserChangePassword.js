import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
} from '@material-ui/core';

const styles = (theme) => ({

})

class UserChangePassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleInput(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async changePassword() {
    const { currentPassword, newPassword, newPasswordConfirm } = this.state;

    if (newPassword !== newPasswordConfirm) {
      return toast.error('Your new passwords don\'t match.')
    }

    try {
      // await changeUserPassword(currentPassword, newPassword);
      alert('update this functionality to make it work');

      this.setState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      })

      toast.success('Password successfully changed');
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  handleEnter(evt) {
    if (evt.keyCode === 13) {
      this.changePassword();
    }
  }

  render() {
    const { classes } = this.props;
    const { currentPassword, newPassword, newPasswordConfirm } = this.state;
    const submitDisabled = (
      !currentPassword ||
      newPassword.length < 8 ||
      (newPassword !== newPasswordConfirm)
    );

    return (
      <Card className={classes.root}>
        <CardHeader
          title="Change Password"
        />          
        <CardContent>
          <TextField
            fullWidth
            margin="normal"
            onChange={this.handleInput}
            type="password"
            value={currentPassword}
            name="currentPassword"
            label="Current Password"
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            onChange={this.handleInput}
            type="password"
            value={newPassword}
            name="newPassword"
            label="New Password"
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            onChange={this.handleInput}
            onKeyDown={this.handleEnter}
            type="password"
            value={newPasswordConfirm}
            name="newPasswordConfirm"
            label="Confirm New Password"
            variant="outlined"
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            disabled={submitDisabled}
            onClick={this.changePassword}
            variant="contained"
          >
            Change Password
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(UserChangePassword);
