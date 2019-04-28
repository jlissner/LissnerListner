import { invokeApig } from '../../lib/awsLib';

export const GET_QUOTES = 'QUOTES::GET';
export const GET_QUOTES_SUCCESS = 'QUOTES::GET_SUCCESS';
export const GET_QUOTES_FAILURE = 'QUOTES::GET_FAILURE';

function getQuotes() {
	return async (dispatch) => {
		dispatch({ type: GET_QUOTES });

		try {
    	const payload = await invokeApig({ path: '/quotes' });

    	dispatch({
    		type: GET_QUOTES_SUCCESS,
    		payload,
    	})
		} catch (err) {
			console.error(err);

			dispatch({ type: GET_QUOTES_FAILURE });
		}
	}
}

export const actions = {
	getQuotes,
}

const ACTION_HANDLERS = {
	[GET_QUOTES_SUCCESS]: (state, { payload }) => payload,
}

const initialState = []

function reducer(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}

export default reducer;