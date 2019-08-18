import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _differenceBy from 'lodash/differenceBy';
import _conact from 'lodash/concat';
import _filter from 'lodash/filter';

const styles = (theme) => ({
  checked: {},
  checkbox: {
    '&$checked': {
      color: green[500], // needs to be child of checkbox for specificity
    },
  },
  formGroup: {
    marginBottom: theme.spacing(4),
  },
})

class RecipeTagsForm extends Component {
  constructor(props) {
    super(props);

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  toggleCheckbox(tag, isActive) {
    return () => {
      const { setValue, tags } = this.props;

      if (isActive) {
        return setValue({
          key: 'tags',
          value: _differenceBy(tags, [tag], 'label'),
        })
      }

      return setValue({
        key: 'tags',
        value: _conact(tags, tag),
      })
    }
  }

  selectRadio(tag) {
    return () => {
      const { setValue, tags } = this.props;
      const category = tag.category;
      const newTags = _filter(tags, (_tag) => _tag.category !== category);

      return setValue({
        key: 'tags',
        value: _conact(newTags, tag)
      })
    }
  }

  renderCheckboxList() {
    const { classes, options, tags } = this.props;

    return (
      _map(options, (option) => {
        const isActive = Boolean(_find(tags, option));

        return (
          <FormControlLabel
            key={option.label}
            label={option.label}
            control={
              <Checkbox
                checked={isActive}
                onChange={this.toggleCheckbox(option, isActive)}
                classes={{
                  root: classes.checkbox,
                  checked: classes.checked,
                }}
              />
            }
          />
        )
      })
    )
  }

  renderRadioList() {
    const { classes, options, tags, title } = this.props;
    const activeRadioTag = _find(tags, {category: title});
    const value = _get(activeRadioTag, 'label', '');

    return (
      <RadioGroup
        name={`${title}-radio`}
        value={value}
      >
        {
          _map(options, (option) => {

            return (
              <FormControlLabel
                key={option.label}
                label={option.label}
                value={option.label}
                control={
                  <Radio
                    onClick={this.selectRadio(option)}
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checked,
                    }}
                  />
                }
              />
            )
          })
        }
      </RadioGroup>
    )
  }

  render() {
    const { classes, radio, title } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6">{title}</Typography>
        <FormGroup className={classes.formGroup}>
          {
            radio
            ? this.renderRadioList()
            : this.renderCheckboxList()
          }
        </FormGroup>
      </React.Fragment>
    );
  }
}

RecipeTagsForm.defaultProps = {}

RecipeTagsForm.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setValue: PropTypes.func.isRequired,
}

export default withStyles(styles)(RecipeTagsForm);
