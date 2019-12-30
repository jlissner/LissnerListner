import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import graphql from '../lib/graphql';

const GET = 'SECTIONS::GET';
const GET_SUCCESS = 'SECTIONS::GET_SUCCESS';
const GET_FAILURE = 'SECTIONS::GET_FAILURE';

export function getSections() {
  return async (dispatch) => {
    dispatch({ type: GET });

    const body = {
      query: `
        query {
          cookbookByIdPk(idPk: "1") {
            sectionsByCookbookFk {
              nodes {
                name
                listOrder
              }
            }
          }
        }
      `,
    };

    try {
      const res = await graphql(body);
      const sections = _get(res, 'cookbookByIdPk.sectionsByCookbookFk.nodes', []);

      dispatch({ type: GET_SUCCESS, payload: sections });
    } catch (err) {
      dispatch({ type: GET_FAILURE });
    }
  }
}

const actionsHandler = {
  [GET_SUCCESS]: (state, { payload }) => _sortBy(payload, ['listOrder']),
}

const initialState = [];

function reducer(state = initialState, action) {
  const handler = actionsHandler[action.type];

  return handler ? handler(state, action) : state;
}

export default reducer;
