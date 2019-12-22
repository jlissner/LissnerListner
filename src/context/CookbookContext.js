import React, { useReducer } from 'react';
import _cloneDeep from 'lodash/cloneDeep';
import graphql from '../lib/graphql';

export const initialForm = {
  open: false,
  saving: false,
  author: '',
  description: '',
  note: '',
  title: '',
  cookTime: '',
  serves: '',
  ingredients: [{ title: '', ingredients: []}],
  directions: [{ title: '', steps: []}],
  tags: [],
};

const intitialCookbook = {
  idPk: null,
  name: '',
  recipes: [],
  sections: [],
  tags: [],
  quotes: [],
  search: '',
  filters: [],
  quotes: [],
  form: _cloneDeep(initialForm),
}

export async function saveForm(form) {
  const {
    title,
    ingredients,
    directions,
    author,
    description,
    note,
    cookTime,
    serves,
    tags,
  } = form;
  const body = {
    query: `
      mutation {
        createRecipe(input: {
          recipe: {
            cookbookFk: ${this.idPk},
            name: ${title},
            ingredients: ${ingredients},
            directions: ${directions},
            additionalAttributes: {
              author: ${author},
              description: ${description},
              note: ${note},
              cookTime: ${cookTime},
              serves: ${serves},
            },
            tags: ${JSON.stringify(tags)}
          }
        })
      }
    `,
  };
  console.log(body)
}

export async function fetchCookbook () {
  const body = {
    query: `
      query {
        cookbookByIdPk(idPk: "1") {
          name
          sectionsByCookbookFk(orderBy: LIST_ORDER_ASC) {
            nodes {
              name
            }
          }
          recipes {
            nodes {
              idPk
              name
              directions
              ingredients
              tags
              additionalAttributes
            }
          }
          cookbookTagsByCookbookFk(orderBy: LIST_ORDER_ASC) {
            nodes {
              category
              label
              type
            }
          }
          cookbookQuotesByCookbookFk {
            nodes {
              author
              quote
            }
          }
        }
      }
    `,
  };

  try {
    const { cookbookByIdPk } = await graphql(body);
    const {
      name,
      recipes,
      cookbookTagsByCookbookFk,
      cookbookQuotesByCookbookFk,
      sectionsByCookbookFk,
    } = cookbookByIdPk;

    return {
      name: name,
      recipes: recipes.nodes,
      tags: cookbookTagsByCookbookFk.nodes,
      sections: sectionsByCookbookFk.nodes,
      quotes: cookbookQuotesByCookbookFk.nodes,
    };
  } catch (err) {
    return {};
  }
}

const CookbookContext = React.createContext();

function setCookbook(cookbook, updatedCookbook) {
  return { ...cookbook, ...updatedCookbook };
}

export function CookbookProvider({ children }) {
  const [state, dispatch] = useReducer(setCookbook, intitialCookbook);

  return (
    <CookbookContext.Provider value={[ state, dispatch ]}>
      {children}
    </CookbookContext.Provider>
  )
}

export default CookbookContext;
