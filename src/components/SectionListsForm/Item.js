import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
// import VertMoveIcon from '@material-ui/icons/UnfoldMore';

const styles = (theme) => ({
  item: {
    // alignItems: 'flex-start',
  },
  removeIcon: {
    // marginTop: theme.spacing.unit / 2,
  },  
});

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  removeItem = () => {
    const { item, removeItem } = this.props;

    removeItem(item);
  }

  handleEnter = (evt) => {
    if (evt.keyCode === 13) {
      this.props.focusNewItem();
    }
  }

  render() {
    const { classes, item, updateItem } = this.props;

    return (
      <ListItem className={classes.item}>
        <TextField
          value={item}
          onChange={updateItem}
          onKeyDown={this.handleEnter}
          fullWidth
          inputProps={{ref: this.inputRef}}
          variant="outlined"
          multiline
        />
        <IconButton className={classes.removeIcon} onClick={this.removeItem} color="secondary">
          <CloseIcon />
        </IconButton>
      </ListItem>
    )
  }
};

Item.defaultProps = {
  item: '',
}

Item.propTypes = {
  item: PropTypes.string,
  removeItem: PropTypes.func.isRequired,
}

export default withStyles(styles)(Item);
