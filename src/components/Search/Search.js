import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
import CookbookContext from '../../context/CookbookContext';

const styles = theme => ({
  search: {
    color: 'inherit',
    '&:before, &:after, &:hover:before, &:hover:after': {
      borderColor: 'inherit !important',
    }
  },
});

function Search({ classes, variant, history, location }) {
  const [ cookbook, setCookbook ] = useContext(CookbookContext);
  const { search } = cookbook;
  const [ val, setVal ] = useState('');
  const [ initialLoad, setInitialLoad ] = useState(true);
  const setSearch = useCallback((val) => {
    setCookbook({ search: val });
  }, [setCookbook])
  const debouncedSetSearch = useMemo(() => (
    _debounce(updatedSearch => setSearch(updatedSearch), 500)
  ), [setSearch])


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
    setSearch(decodedParam)
  }, [setSearch, setVal, location.search, initialLoad])

  useEffect(() => {
    const parsedQueryString = qs.parse(location.search);

    parsedQueryString.search = val || undefined;

    history.push({search: qs.stringify(parsedQueryString)})

    debouncedSetSearch(val)
  }, [debouncedSetSearch, val, history, location.search])

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

export default withRouter(withStyles(styles)(Search));
