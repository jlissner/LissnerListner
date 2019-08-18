import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import _map from 'lodash/map';
import _without from 'lodash/without';
import ListSection from './ListSection';

const styles = (theme) => ({
});

class SectionListsForm extends React.Component {
  removeSection = (indexOfSection) => {
    return () => {
      const { category, data } = this.props;

      data.splice(indexOfSection, 1);

      this.props.setValue({
        key: category,
        value: data,
      });
    }
  }

  removeItem = (indexOfSection) => (item) => {
    const { category, data, subSection } = this.props;

    data[indexOfSection][subSection] = _without(data[indexOfSection][subSection], item);

    this.props.setValue({
      key: category,
      value: data,
    });
  }

  addSection = () => {
    const { data, category, setValue, subSection } = this.props;

    setValue({
      key: category,
      value: [...data, { title: '', [subSection]: [] }],
    });
  }

  addItem = (indexOfSection) => (item) => {
    const { category, data, subSection } = this.props;

    data[indexOfSection][subSection].push(item);

    this.props.setValue({
      key: category,
      value: data,
    });
  }

  updateItem = (indexOfSection) => (indexOfItem) => (evt) => {
    const { category, data, subSection } = this.props;

    data[indexOfSection][subSection][indexOfItem] = evt.target.value;

    this.props.setValue({
      key: category,
      value: data,
    });
  }

  updateSectionTitle = (indexOfSection) => (title) => {
    const { data, category } = this.props;

    data[indexOfSection].title = title;

    this.props.setValue({
      key: category,
      value: data,
    });
  }

  render() {
    const {
      data,
      newSubItemTitle,
      title,
      subSection,
    } = this.props;

    return (
      <React.Fragment>
        <Typography paragraph variant="h6">{title}</Typography>
        {
          _map(data, (listSection, indexOfSection) => (
            <ListSection
              key={indexOfSection}
              addItem={this.addItem(indexOfSection)}
              newSubItemTitle={newSubItemTitle}
              subSection={subSection}
              listSection={listSection}
              removeSection={this.removeSection(indexOfSection)}
              removeItem={this.removeItem(indexOfSection)}
              updateItem={this.updateItem(indexOfSection)}
              updateSectionTitle={this.updateSectionTitle(indexOfSection)}
            />
          ))
        }
        <Button
          color="secondary"
          onClick={this.addSection}
          variant="contained"
        >
          Add New Section
        </Button>
      </React.Fragment>
    )
  }
};

export default withStyles(styles)(SectionListsForm);
