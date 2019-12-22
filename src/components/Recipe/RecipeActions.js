// import graphql from '../../lib/graphql';
// 
// export const GET_RECIPES = 'RECIPES::GET_RECIPES';
// export const GET_RECIPES_SUCCESS = 'RECIPES::GET_RECIPES_SUCCESS';
// export const GET_RECIPES_FAILURE = 'RECIPES::GET_RECIPES_FAILURE';
// 
// function getRecipesSuccess(recipes) {
//   return {
//     type: GET_RECIPES_SUCCESS,
//     payload: recipes,
//   }
// }
// 
// function getRecipesFailure(recipes) {
//   return {
//     type: GET_RECIPES_SUCCESS,
//     payload: recipes,
//   }
// }
// 
// export function getRecipes() {
//   return async (dispatch) => {
//     dispatch({ type: GET_RECIPES })
// 
//     const body = {
//       query: `
//         query {
//           allRecipes {
//             nodes {
//               name
//             }
//           }
//         }
//       `,
//     };
// 
//     try {
//       const res = await graphql(body)
//       const recipes = res.allRecipes.nodes
//       
//       dispatch(getRecipesSuccess(recipes))
//     } catch (err) {
//       console.error(err);
// 
//       dispatch(getRecipesSuccess([]))
//     }
//   }
// }
// 
// export const actions = {
//   getRecipes,
// }
// 
// const ACTION_HANDLERS = {
//   [GET_RECIPES]: (state) => {
//     return {
//       ...state,
//       status: 'LOADING',
//     }
//   },
//   [GET_RECIPES_SUCCESS]: (state, action) => {
//     return {
//       status: 'LOADED',
//       recipes: action.payload
//     }
//   },
//   [GET_RECIPES_FAILURE]: (state, action) => {
//     return {
//       status: 'ERROR',
//       recipes: [action.payload]
//     }
//   },
// }
// 
// const initialState = {
//   status: 'INITIAL',
//   recipes: [],
// }
// 
// export default function recipeReducer(state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type]
// 
//   return handler ? handler(state, action) : state
// }