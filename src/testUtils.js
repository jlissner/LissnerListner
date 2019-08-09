import React from 'react';
import { Provider, connect } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import createStore from './redux/store';
import defaultInitialState from '../__mocks__/defaultInitialState'

const defaultInitissalState = {
	user: {
		authenticating: false,
		activeUser: {
			Id: 3,
			favoriteRecipes: [1, 2]
		}
	},
	filters: {
		recipes: [{ category: 'Section', label: 'Appitizers'}],
	},
	recipes: [{
		author: 'Connie',
		title: 'Test 1',
		tags: [{ category: 'Section', label: 'Appitizers'}]
	}, {
		author: 'Connie',
		title: 'Test 2',
		tags: [{ category: 'Section', label: 'Bread'}]
	}]
}

export function renderWithRedux(
	ui,
	{
		initialState = defaultInitialState,
		store = createStore(initialState),
	} = {}
) {
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		store
	}
}

export function renderWithRouter(ui) {
	return {
		...render(<BrowserRouter>{ui}</BrowserRouter>)
	}
}

export function renderWithReduxAndRounter(
	ui,
	{
		initialState = defaultInitialState,
		store = createStore(initialState),
	} = {}
) {
	return {
		...render(
			<Provider store={store}>
				<BrowserRouter>
					{ui}
				</BrowserRouter>
			</Provider>
		),
		store
	} 
}