import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';
import _map from 'lodash/map';
import _pick from 'lodash/pick';
import _transform from 'lodash/transform';
import LoaderButton from '../LoaderButton/LoaderButton';

const ATTRIBUTES_TO_UPDATE = [
  'given_name',
  'preferred_username',
  'middle_name',
  'family_name',
  'birthdate',
  'gender',
  'phone_number',
  'email',
  'address',
];

function UserDetails({ user }) {
  const { activeUser } = user;
  const initialAttributes = _transform(activeUser.attributes, (cur, { Name, Value }) => (cur[Name] = Value), {});
  const initialAttributesToUpdate = _pick(initialAttributes, ATTRIBUTES_TO_UPDATE);
  const [attributes, setAttributes] = useState(initialAttributesToUpdate);
  const [loading, setLoading] = useState(false);

  function updateAttribute(name) {
    return (evt) => {
      const updatedAttributes = {
        ...attributes,
        [name]: evt.target.value,
      };

      setAttributes(updatedAttributes);
    }
  }

  async function saveAttribtues() {
    const token = activeUser.signInUserSession.accessToken.jwtToken;
    const updatedAttributes = _map(attributes, (val, key) => ({ Name: key, Value: val }));

    setLoading(true);
    
    try {
      // TODO: save updated user attributes
    } catch (err) {
      console.error(err);
    }
    
    setLoading(false);
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={updateAttribute('given_name')}
            name="firstName"
            fullWidth
            label="First Name"
            variant="outlined"
            value={attributes.given_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={updateAttribute('preferred_username')}
            name="preferredName"
            fullWidth
            label="Preferred Name"
            variant="outlined"
            value={attributes.preferred_username}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={updateAttribute('middle_name')}
            value={attributes.middle_name || ''}
            fullWidth
            label="Middle Name"
            name="middleName"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={updateAttribute('family_name')}
            value={attributes.family_name || ''}
            fullWidth
            label="Last Name"
            name="lastName"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={updateAttribute('birthdate')}
            value={attributes.birthdate || ''}
            fullWidth
            label="Birthday"
            name="birthday"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={updateAttribute('gender')}
            value={attributes.gender || ''}
            fullWidth
            label="Gender"
            name="gender"
            variant="outlined"
            select
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={updateAttribute('phone_number')}
            value={attributes.phone_number || ''}
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            onChange={updateAttribute('email')}
            value={attributes.email || ''}
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={updateAttribute('address')}
            value={attributes.address || ''}
            fullWidth
            label="Address"
            name="address"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <LoaderButton isLoading={loading} onClick={saveAttribtues} text="Save" loadingText="Save" />
        </Grid>
        <Grid item>
          <Button onClick={() => setAttributes(initialAttributesToUpdate)}>Reset</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserDetails;
