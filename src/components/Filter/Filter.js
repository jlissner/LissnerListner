import React, { useEffect, useMemo } from 'react';
import qs from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import FilterSection from './FilterSection';

function updateHistory(history, search) {
  history.push({ search })
}

function Filter({ filters, tags, category, history, location, setFilters, appliedFilters }) {
  const updateHistoryDebounced = useMemo(() => _debounce(updateHistory, 100), []);

  useEffect(() => {
    const parsedQueryString = qs.parse(location.search);
    const filtersString = _get(parsedQueryString, 'filters');
    const filterValue = filtersString
      ? JSON.parse(filtersString)
      : [];

    setFilters({ category: 'recipes', value: filterValue})
  }, []);

  useEffect(() => {
    const curSearch = qs.parse(location.search);

    curSearch.filters = _get(appliedFilters, `${category}.length`)
      ? JSON.stringify(appliedFilters[category])
      : undefined;

    updateHistoryDebounced(history, qs.stringify(curSearch))
  }, [appliedFilters])

  if (tags.length === 0) {
    return (
      <CircularProgress />
    );
  }

  return (
      <React.Fragment>
        <FilterSection
          filters={filters.Section}
          category={category}
          subCategory={'Section'}
        />

        <FilterSection
          filters={filters.Difficulty}
          category={category}
          subCategory={'Difficulty'}
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
