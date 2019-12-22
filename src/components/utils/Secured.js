import React, { useContext } from 'react';
import {
  Typography,
} from '@material-ui/core';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import UserContext from '../../context/UserContext';

function Secured({
  component,
  roles,
  activeUser,
}) {
  const { attributes } = useContext(UserContext);
  const { isAdmin } = attributes;

  if (isAdmin) {
    return component
  }

  return <Typography>You are not authorized to view this content.</Typography>
}

export default Secured;
