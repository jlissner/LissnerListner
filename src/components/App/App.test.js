import React from 'react';
import { cleanup, render }from '@testing-library/react';
import App from './App';

describe('App', () => {
	afterEach(cleanup);

	it('renders', () => {
		render(<App />)
	});
})

