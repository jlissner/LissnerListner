import React from 'react';
import { cleanup, render }from '@testing-library/react';
import App from './App';

jest.mock('../../lib/cookies');

describe('App', () => {
	afterEach(cleanup);

	it('renders', () => {
		render(<App />)
	});
})

