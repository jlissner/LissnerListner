import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  search: {
    color: 'inherit',
    '&:before, &:after, &:hover:before, &:hover:after': {
      borderColor: 'inherit !important',
    }
  },
})

class Search extends Component {
  updateSearch = (evt) => {
    const { setSearch, category } = this.props;

    setSearch({ category, value: evt.target.value });
  }
  render() {
    const { 
      classes,
      category,
      search,
    } = this.props;

    return (
      <TextField
        className={classes.search}
        placeholder="Search..."
        fullWidth
        id="search-input"
        value={search[category]}
        onChange={this.updateSearch}
        InputProps={{
          classes: {
            root: classes.search,
            underline: classes.search,
            input: classes.search,
            formControl: classes.search,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    )

    // return (
    //   <FormControl fullWidth variant="outlined" className={classes.search}>
    //     <InputLabel htmlFor="search-input" variant="outlined">Search</InputLabel>
    //     <OutlinedInput
    //       id="search-input"
    //       value={search[category]}
    //       onChange={this.updateSearch}
    //       labelWidth={55}
    //       startAdornment={(
    //         <InputAdornment position="start">
    //           <SearchIcon />
    //         </InputAdornment>
    //       )}
    //     />
    //   </FormControl>
    // );
  }
}

export default withStyles(styles)(Search);
