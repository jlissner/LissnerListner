import React from 'react';
import Filter from './FilterContainer';
import { renderWithReduxAndRounter } from '../../testUtils';

jest.mock('../../lib/awsLib');

describe('Filter', () => {
	const props = {
		category: 'recipes'
	};

	it('renders', () => {
		renderWithReduxAndRounter(<Filter {...props} />)
	})
})