import React from 'react';
import { connect } from 'react-redux';
import {
  Typography,
} from '@material-ui/core';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';

const mapStateToProps = (state) => ({
  activeUser: state.user.activeUser,
});

function Secured({
  component,
  roles,
  activeUser,
}) {
  const authorized = _reduce(roles, (res, role) => (
    res || (_get(activeUser, 'roles', []).indexOf(role) > -1)
  ), false);

  if (authorized) {
    return component
  }

  return <Typography>You are not authorized to view this content.</Typography>
}

export default connect(mapStateToProps)(Secured);
