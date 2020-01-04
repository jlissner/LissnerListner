import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import {
  InputAdornment,
  Paper,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import _debounce from 'lodash/debounce';
import qs from 'query-string';
import { setSearch } from './SearchActions';

const styles = theme => ({
  search: {
    color: 'inherit',
    '&:before, &:after, &:hover:before, &:hover:after': {
      borderColor: 'inherit !important',
    }
  },
});

function Search({ classes, variant, history, location }) {
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();
  const [ val, setVal ] = useState('');
  const [ initialLoad, setInitialLoad ] = useState(true);
  const debouncedSetSearch = useCallback(_debounce((val) => dispatch(setSearch(val)), 500), [dispatch]);
  const qsSearch = getSeachFromParam();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  function getSeachFromParam() {
    const urlParams = new URLSearchParams(location.search);
    const encodedParam = urlParams.get('search');
    
    return encodedParam ? decodeURIComponent(encodedParam) : '';
  }

  useEffect(() => {
    if (!initialLoad) {
      return;
    }

    setVal(qsSearch);

    if (search !== qsSearch) {
      dispatch(setSearch(qsSearch));
    }
  }, [dispatch, qsSearch, initialLoad, search])

  useEffect(() => {
    if (initialLoad) {
      return;
    }

    if (qsSearch !== val) {
      history.push({search: qs.stringify({search: val})})
    }

    if (search !== val) {
      debouncedSetSearch(val)
    }
  }, [debouncedSetSearch, initialLoad, val, history, qsSearch, search])

  return (
    <Paper>
      <TextField
        className={classes.search}
        placeholder="Search..."
        fullWidth
        id="search-input"
        value={val}
        onChange={evt => setVal(evt.target.value)}
        variant={variant}
        InputProps={{
          classes: {
            root: classes.search,
            input: classes.search,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Paper>
  )
}

export default withRouter(withStyles(styles)(Search));
