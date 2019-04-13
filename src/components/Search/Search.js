import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
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
  const [ valTimeout, setValTimeout ] = useState(0);

  function updateSearchUrl(value) {
    const parsedQueryString = qs.parse(location.search);

    parsedQueryString.search = value || undefined;

    history.push({search: qs.stringify(parsedQueryString)})
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const encodedParam = urlParams.get('search');
    const decodedParam = encodedParam ? decodeURIComponent(encodedParam) : '';

    setVal(decodedParam)
    setSearch({ category, value: decodedParam })
  }, [])

  useEffect(() => {
    clearTimeout(valTimeout);
    updateSearchUrl(val)

    setValTimeout(setTimeout(() => {
      setSearch({ category, value: val })
    }, 500))
  }, [val])

  return (
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
  )
}

Search.defaultProps = {
  category: 'recipes',
}

export default withStyles(styles)(Search);
