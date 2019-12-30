import React from 'react';
import Filter from './FilterContainer';
import { renderWithReduxAndRounter } from '../../testUtils';

jest.mock('../../lib/graphql');

describe('Filter', () => {
	const props = {
		category: 'recipes'
	};

	it('renders', () => {
		renderWithReduxAndRounter(<Filter {...props} />)
	})
})