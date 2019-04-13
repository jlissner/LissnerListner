import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import _get from 'lodash/get';
import qs from 'query-string';
import FilterSection from './FilterSection';

function Filter({ filters, tags, category, history, location, setFilters, appliedFilters }) {
  useEffect(() => {
    const parsedQueryString = qs.parse(location.search);
    const filtersString = _get(parsedQueryString, 'filters');

    if (filtersString) {
      const filtersObj = JSON.parse(filtersString)

      setFilters({ category: 'recipes', value: filtersObj})
    }
  }, []);

  useEffect(() => {
    console.log('here', appliedFilters)
    const curSearch = qs.parse(location.search);

    curSearch.filters = _get(appliedFilters, `${category}.length`)
      ? JSON.stringify(appliedFilters[category])
      : undefined;

    history.push({
      search: qs.stringify(curSearch)
    })
  }, [appliedFilters])

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
          filters={filters['Cooking Style']}
          category={category}
          subCategory={'Cooking Style'}
        />

        <FilterSection
          filters={filters.Ethnicity}
          category={category}
          subCategory={'Ethnicity'}
        />
      </React.Fragment>
  );
};

export default Filter;
