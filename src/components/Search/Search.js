import React, { useEffect, useMemo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  InputAdornment,
  Paper,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import _debounce from 'lodash/debounce';
import qs from 'query-string';

const styles = theme => ({
  search: {
    color: 'inherit',
    '&:before, &:after, &:hover:before, &:hover:after': {
      borderColor: 'inherit !important',
    }
  },
})

function Search({ classes, setSearch, category, search, variant, history, location }) {
  const [ val, setVal ] = useState('');
  const [ initialLoad, setInitialLoad ] = useState(true);
  const debouncedSetSearch = useMemo(() => _debounce(setSearch, 500), [setSearch])

  useEffect(() => {
    setInitialLoad(false)
  }, [])

  useEffect(() => {
    if (!initialLoad) {
      return
    }

    const urlParams = new URLSearchParams(location.search);
    const encodedParam = urlParams.get('search');
    const decodedParam = encodedParam ? decodeURIComponent(encodedParam) : '';

    setVal(decodedParam)
    setSearch({ category, value: decodedParam })
  }, [category, setSearch, setVal, location.search, initialLoad])

  useEffect(() => {
    const parsedQueryString = qs.parse(location.search);

    parsedQueryString.search = val || undefined;

    history.push({search: qs.stringify(parsedQueryString)})

    debouncedSetSearch({ category, value: val })
  }, [debouncedSetSearch, val, category, history, location.search])

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

Search.defaultProps = {
  category: 'recipes',
}

export default withStyles(styles)(Search);
