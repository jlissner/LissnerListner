import React from 'react';
import {
	act,
	cleanup,
	fireEvent,
	render,
	waitForElement,
} from '@testing-library/react';
import Favorite from './Favorite';

describe('Favorite Component', () => {
	const props = {
		isFavorite: true,
		disabled: false,
	  activeUser: {
	  	Id: 3,
	  	favoriteRecipes: [1, 2]
	  },
	  updateUser: jest.fn().mockImplementation(() => setTimeout(Promise.resolve, 500)),
	  recipe: 1,
	};

	afterEach(cleanup)

	it('renders', () => {
		render(<Favorite {...props} />)
	});

	it('toggles loading to when updating user', async () => {
		const { getByTestId } = render(<Favorite {...props} />);

		getByTestId('loaded');
		fireEvent.click(getByTestId('loaded'));
		await waitForElement(() => getByTestId('loading'));
	  await waitForElement(() => getByTestId('loaded'));
	});

	it('adds a recipe to favorites', () => {
		const testProps = {
			...props,
			isFavorite: false,
			recipe: 3
		};
		const { getByTestId } = render(<Favorite {...testProps} />);

		fireEvent.click(getByTestId('loaded'));

		expect(props.updateUser).toHaveBeenCalledWith({
			Id: 3,
			favoriteRecipes: [1, 2, 3]
		});
	});

	it('removes a recipe to favorites', () => {
		const { getByTestId } = render(<Favorite {...props} />);

		fireEvent.click(getByTestId('loaded'));

		expect(props.updateUser).toHaveBeenCalledWith({
			Id: 3,
			favoriteRecipes: [2]
		});
	});

	it('renders the correct element when it is favorite', () => {
		const { getByTestId } = render(<Favorite {...props} />);

		getByTestId('is-favorite');
	});

	it('renders the correct element when it is not favorite', () => {
		const { getByTestId } = render(<Favorite {...props} isFavorite={false} />);

		getByTestId('not-favorite');
	});
})