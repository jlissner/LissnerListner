import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import { createUser } from '../../lib/aws/cognito';

function CreateUser() {
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
  }, [loading])

  function onSubmit(e) {
    e.preventDefault();

    const attributes = [
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName },
      { Name: 'preferred_username', Value: preferredName },
    ];

    setLoading(true);
    
    createUser(email, attributes)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <Paper>
      <Box p={2} width={320}>
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
