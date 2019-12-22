import React, { useContext, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { CircularProgress } from '@material-ui/core';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import CookbookContext from '../../context/CookbookContext';
import useNumberOfFavoriteRecipes from '../../hooks/useNumberOfFavoriteRecipes';
import useAvailableFilters from '../../hooks/useAvailableFilters';
import FilterSection from './FilterSection';
import FavoriteFilter from './FavoriteFilter';

function updateHistory(history, search) {
  history.push({ search });
}

function Filter({
  history,
  location,
}) {
  const [ cookbook, setCookbook ] = useContext(CookbookContext);
  const { tags } = cookbook;
  const filters = useAvailableFilters(location);
  const numberOfFavoriteRecipes = useNumberOfFavoriteRecipes();
  const updateHistoryDebounced = useMemo(() => _debounce(updateHistory, 100), []);
  function setFilters(val) {
    setCookbook({ filters: val });
  }

  useEffect(() => {
    const parsedQueryString = qs.parse(location.search);
    const filtersString = _get(parsedQueryString, 'filters');
    const filterValue = filtersString
      ? JSON.parse(filtersString)
      : [];

    setFilters(filterValue)
  }, [location.search]);

  useEffect(() => {
    const curSearch = qs.parse(location.search);

    curSearch.filters = filters.length
      ? JSON.stringify(filters)
      : undefined;

    updateHistoryDebounced(history, qs.stringify(curSearch))
  }, [filters, location.search, history, updateHistoryDebounced])

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
          subCategory={'Section'}
        />

        <FilterSection
          filters={filters.Difficulty}
          subCategory={'Difficulty'}
        />

        <FilterSection
          filters={filters['Dietary Preference']}
          subCategory={'Dietary Preference'}
        />

        <FilterSection
          filters={filters['Cooking Style']}
          subCategory={'Cooking Style'}
        />

        <FilterSection
          filters={filters.Ethnicity}
          subCategory={'Ethnicity'}
        />
      </React.Fragment>
  );
};

Filter.propTypes = {
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
}

export default withRouter(Filter);
