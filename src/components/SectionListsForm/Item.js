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
  removeIcon: {
  }
});

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    }

    this.inputRef = React.createRef();
  }

  stopEditing = () => {
    this.setState({
      editMode: false,
    })
  }

  startEditing = () => {
    this.setState({
      editMode: true,
    }, () => {
      this.inputRef.current.focus();
    })
  }

  removeItem = () => {
    const { item, removeItem } = this.props;

    removeItem(item);
  }

  render() {
    const { classes, item, updateItem } = this.props;
    const { editMode } = this.state;

    return (
      <ListItem>
        {
          editMode
          ? <TextField
              value={item}
              onChange={updateItem}
              onBlur={this.stopEditing}
              fullWidth
              inputProps={{ref: this.inputRef}}
            />
          : <ListItemText onClick={this.startEditing}>
              {item}
            </ListItemText>
        }
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
