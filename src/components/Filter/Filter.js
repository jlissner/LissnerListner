import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterSection from './FilterSection';

class Filter extends React.Component {
  render() {
    const { filters, tags, category } = this.props;

    if (tags.length === 0) {
      return (
        <CircularProgress />
      );
    }

    return (
        <React.Fragment>
          <FilterSection
            filters={filters.Difficulty}
            category={category}
            subCategory={'Difficulty'}
          />

          <FilterSection
            filters={filters.Section}
            category={category}
            subCategory={'Section'}
          />

          <FilterSection
            filters={filters['Dietary Preference']}
            category={category}
            subCategory={'Dietary Preference'}
          />

          <FilterSection
            filters={filters.Ethnicity}
            category={category}
            subCategory={'Ethnicity'}
          />
        </React.Fragment>
    );
  }
};

export default Filter;
