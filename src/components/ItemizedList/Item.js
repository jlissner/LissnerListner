import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import green from '@material-ui/core/colors/green';
import _map from 'lodash/map';

const regex = new RegExp(/([0-9]\/[0-9])/)
const styles = (theme) => ({
  checked: {
    color: green[500],
  },
  lineThrough: {
    textDecoration: 'line-through',
  },
  fraction: {
    display: 'inline-block',
    fontSize: '.8rem',
    marginRight: '-.5rem',
    lineHeight: 1,
  },
  numerator: {
    display: 'inline-block',
    position: 'relative',
    top: '-.15rem',
  },
  denominator: {
    display: 'inline-block',
    position: 'relative',
    left: '-.65rem',
    top: '.05rem',
  },
  dash: {
    display: 'inline-block',
    height: 1,
    width: '1rem',
    transform: 'rotate(-60deg)',
    position: 'relative',
    left: '-.3rem',
    top: '-.35rem',
    background: theme.palette.grey[500],
  },
});

class RecipeDirections extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    };

    this.renderText = this.renderText.bind(this);
  }

  toggleChecked = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }

  renderText() {
    const { classes, item } = this.props;

    return _map(item.split(regex), text => (
      text.match(regex)
        ? <span key={text} className={classes.fraction}>
            <span className={classes.numerator}>{text[0]}</span>
            <span className={classes.dash}></span>
            <span className={classes.denominator}>{text[2]}</span>
          </span>
        : <span key={text}>{text}</span>
    ))
  }

  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    return (
      <ListItem button onClick={this.toggleChecked}>
        <ListItemIcon>
          <CheckIcon className={checked ? classes.checked : ''} />
        </ListItemIcon>
        <ListItemText className={checked ? classes.lineThrough : ''} inset primary={this.renderText()} />
      </ListItem>
    );
  }
};

export default withStyles(styles)(RecipeDirections);
