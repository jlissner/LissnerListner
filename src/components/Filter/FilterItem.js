import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import green from '@material-ui/core/colors/green';
import _filter from 'lodash/filter';
import _get from 'lodash/get';
import _find from 'lodash/find';

const styles = (theme) => ({
  checked: {
    color: green[500],
  },
});

class FilterItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    }
  }

  toggleChecked = () => {
    this.setState({
      checked: !this.state.checked,
    });
  }

  handleCheck = () => {
    const { toggleFilter, category, label } = this.props

    this.toggleChecked()

    toggleFilter({category, label})
  }

  checkDisabled = () => {
    const { label, category, recipes } = this.props;
    const currentFilter = { label, category };
    const availableRecipes = _filter(recipes, (recipe) => _find(recipe.tags, currentFilter));

    return !Boolean(_get(availableRecipes, 'length', true))
  }

  render() {
    const { label, classes } = this.props;
    const { checked } = this.state;

    return (
      <ListItem button onClick={this.handleCheck} disabled={this.checkDisabled()}>
        <ListItemIcon>
          {
            checked
              ? <CheckBoxIcon className={classes.checked} />
              : <CheckBoxOutlineBlankIcon />
          }
        </ListItemIcon>
        <ListItemText inset primary={label} />
      </ListItem>
    );
  }
};

export default withStyles(styles)(FilterItem);
