import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { CircularProgress } from '@material-ui/core';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import FilterSection from './FilterSection';
import FavoriteFilter from './FavoriteFilter';
import { setFilters } from './FilterActions';
import getAvailableFilters from './getAvailableFilters'
import getNumberOfFavoriteRecipes from '../Favorite/getNumberOfFavoriteRecipes'

function Filter({
  history,
  location,
}) {
  const dispatch = useDispatch();
  const availableFilters = useSelector(state => getAvailableFilters(state, { location }));
  const numberOfFavoriteRecipes = useSelector(state => getNumberOfFavoriteRecipes(state, { location }));
  const filters = useSelector(state => state.filters);
  const tags = useSelector(state => state.tags);
  const [initialLoad, setInitialLoad] = useState(true);
  const curSearch = qs.parse(location.search);
  const qsFilters = _get(curSearch, 'filters', JSON.stringify([]));

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      return;
    }

    const filterValue = qsFilters
      ? JSON.parse(qsFilters)
      : [];

    if (!_isEqual(filterValue, filters)) {
      dispatch(setFilters(filterValue));
    }
  }, [location.search, dispatch, qsFilters, filters, initialLoad]);

  useEffect(() => {
    if (initialLoad || _isEqual(JSON.parse(qsFilters), filters)) {
      return;
    }

    curSearch.filters = filters.length
      ? JSON.stringify(filters)
      : undefined;
    

    history.push({ search: qs.stringify(curSearch) })
  }, [filters, curSearch, history, initialLoad, qsFilters])

  if (tags.length === 0) {
    return (
      <CircularProgress />
    );
  }

  return (
      <>
        <FavoriteFilter
          numberOfRecipes={numberOfFavoriteRecipes}
        />

        <FilterSection
          filters={availableFilters.Section}
          subCategory={'Section'}
        />

        <FilterSection
          filters={availableFilters.Difficulty}
          subCategory={'Difficulty'}
        />

        <FilterSection
          filters={availableFilters['Dietary Preference']}
          subCategory={'Dietary Preference'}
        />

        <FilterSection
          filters={availableFilters['Cooking Style']}
          subCategory={'Cooking Style'}
        />

        <FilterSection
          filters={availableFilters.Ethnicity}
          subCategory={'Ethnicity'}
        />
      </>
  );
};

Filter.propTypes = {
  history: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
}

export default withRouter(Filter);
