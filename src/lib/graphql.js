import axios from 'axios';
import _get from 'lodash/get';
import config from '../config';
import { getCookie } from './cookies';

const { url } = config.postgraphile;

async function graphql(body) {
  const token = getCookie('userJWT');
  const headers = token ? { Authorization: `Bearer ${token}`} : {};
  const res = await axios.post(url, body, { headers });

  return _get(res, 'data.data');
}

export default graphql;
