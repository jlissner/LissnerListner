import React from 'react';
import Filter from './Filter';
import { renderWithReduxAndRounter } from '../../testUtils';

jest.mock('../../lib/graphql');

describe('Filter', () => {
	it('renders', () => {
		renderWithReduxAndRounter(<Filter />)
	})
})