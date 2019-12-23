import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import { createUser } from './UserActions';

function CreateUser() {
  const { users } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [password] = useState(v4());
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setEmail('');
      setFirstName('');
      setLastName('');
      setPreferredName('');
    }
  }, [loading]);

  useEffect(() => {
    setLoading(false)
  }, [users]);

  function onSubmit(e) {
    e.preventDefault();

    setLoading(true);

    dispatch(createUser({
      email: email,
      legalFirstName: firstName,
      legalLastName: lastName,
      preferredName: preferredName,
      passwordHash: password,
    }))
  }

  return (
    <Paper>
      <Box p={2}>
        <Grid
          component="form"
          container
          onSubmit={onSubmit}
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={evt => setEmail(evt.target.value)}
              value={email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              onChange={evt => setFirstName(evt.target.value)}
              value={firstName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Preferred Name"
              name="preferredName"
              onChange={evt => setPreferredName(evt.target.value)}
              value={preferredName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              onChange={evt => setLastName(evt.target.value)}
              value={lastName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Temp Password"
              name="tempPassword"
              value={password}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="primary"
              disabled={loading}
              fullWidth
              type="submit"
              variant="contained"
            >
              Create User
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default CreateUser;
