import React from 'react';
import {
	act,
	cleanup,
	fireEvent,
	render,
	waitForElement,
} from '@testing-library/react';
import { renderWithRedux } from '../../testUtils';
import { invokeApig } from '../../lib/awsLib';
import Favorite from './FavoriteContainer';

jest.mock('../../lib/awsLib');

describe('Favorite Component', () => {
	const props = {
		disabled: false,
	  recipe: '4fff2c03-996d-4e99-93cf-56ae02c9d7cd',
	};

	beforeEach(() => {
		jest.clearAllMocks();
	})

	afterEach(cleanup)

	it('renders', () => {
		renderWithRedux(<Favorite {...props} />)
	});

	it('toggles loading to when updating user', async () => {
		const { getByTestId } = renderWithRedux(<Favorite {...props} />);

		getByTestId('loaded');
		fireEvent.click(getByTestId('loaded'));
		await waitForElement(() => getByTestId('loading'));
	  await waitForElement(() => getByTestId('loaded'));
	});

	it('adds a recipe to favorites', () => {
		const testProps = {
			...props,
			recipe: 'testRecipe',
		};
		const { getByTestId } = renderWithRedux(<Favorite {...testProps} />);
		const payload = {
			path: '/users',
			method: 'put',
			body: {
				Id: 'fbcdfc49-840f-4c0e-9113-369f2995e2bc',
				favoriteRecipes: ["4fff2c03-996d-4e99-93cf-56ae02c9d7cd", "2424ea79-6f68-4256-b35a-299e12da81d2", "43e0dc76-55e3-4d9a-ad4c-89937da68b58", "996a9078-b24f-4723-b1f1-366c511c11ae", 'testRecipe']
			}
		}
		fireEvent.click(getByTestId('loaded'));

		expect(invokeApig).toHaveBeenCalledWith(payload);
	});

	it('removes a recipe to favorites', () => {
		const { getByTestId } = renderWithRedux(<Favorite {...props} />);
		const payload = {
			path: '/users',
			method: 'put',
			body: {
				Id: 'fbcdfc49-840f-4c0e-9113-369f2995e2bc',
				favoriteRecipes: ["2424ea79-6f68-4256-b35a-299e12da81d2", "43e0dc76-55e3-4d9a-ad4c-89937da68b58", "996a9078-b24f-4723-b1f1-366c511c11ae"]
			}
		}

		fireEvent.click(getByTestId('loaded'));

		expect(invokeApig).toHaveBeenCalledWith(payload);
	});

	it('renders the correct element when it is favorite', () => {
		const { getByTestId } = renderWithRedux(<Favorite {...props} />);

		getByTestId('is-favorite');
	});

	it('renders the correct element when it is not favorite', () => {
		const testProps = {
			...props,
			recipe: '4fff2c03-996d-4e99-93cf-56ae02c9d7cf',
		}
		const { getByTestId } = renderWithRedux(<Favorite {...testProps} />);

		getByTestId('not-favorite');
	});
})