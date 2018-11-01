import React from 'react';
import FilterSection from './FilterSection'

class Filter extends React.Component {
  componentDidMount() {
    const { tags, getTags } = this.props;

    if (tags.length === 0) {
      getTags()
    }
  }

  render() {
    const { filters } = this.props;

    return (
        <React.Fragment>
          <FilterSection
            filters={filters.Difficulty}
            category={'Difficulty'}
          />

          <FilterSection
            filters={filters.Section}
            category={'Section'}
          />

          <FilterSection
            filters={filters['Dietary Preference']}
            category={'Dietary Preference'}
          />

          <FilterSection
            filters={filters.Ethnicity}
            category={'Ethnicity'}
          />
        </React.Fragment>
    );
  }
};

export default Filter;
