import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { CircularProgress } from '@material-ui/core';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import FilterSection from './FilterSection';
import FavoriteFilter from './FavoriteFilter';

function updateHistory(history, search) {
  history.push({ search })
}

function Filter({
  appliedFilters,
  category,
  filters,
  history,
  location,
  numberOfFavoriteRecipes,
  setFilters,
  tags,
}) {
  const updateHistoryDebounced = useMemo(() => _debounce(updateHistory, 100), []);

  useEffect(() => {
    const parsedQueryString = qs.parse(location.search);
    const filtersString = _get(parsedQueryString, 'filters');
    const filterValue = filtersString
      ? JSON.parse(filtersString)
      : [];

    setFilters({ category: 'recipes', value: filterValue})
  }, [location.search, setFilters]);

  useEffect(() => {
    const curSearch = qs.parse(location.search);

    curSearch.filters = _get(appliedFilters, `${category}.length`)
      ? JSON.stringify(appliedFilters[category])
      : undefined;

    updateHistoryDebounced(history, qs.stringify(curSearch))
  }, [appliedFilters, location.search, category, history, updateHistoryDebounced])

  if (tags.length === 0) {
    return (
      <CircularProgress />
    );
  }

  return (
      <React.Fragment>
        <FavoriteFilter
          numberOfRecipes={numberOfFavoriteRecipes}
        />

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

Filter.propTypes = {
  filters: PropTypes.shape().isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  category: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
  setFilters: PropTypes.func.isRequired,
  appliedFilters: PropTypes.shape().isRequired,
}

export default Filter;
