import React, { useReducer } from 'react';

const initialNav = {
  open: false,
  items: [
    {
      name: 'Cookbook',
      url: '/cookbook',
      icon: 'Menu'
    }, {
      name: 'About',
      url: '/about',
      icon: 'Info'
    }
  ]
};

const NavContext = React.createContext('nav');

function setNav(curNav, updatedNav) {
  return { ...curNav, ...updatedNav };
} 

export function NavProvider({ children }) {
  const [state, dispatch] = useReducer(setNav, initialNav);

  return (
    <NavContext.Provider value={[state, dispatch]}>
      {children}
    </NavContext.Provider>
  )
}

export default NavContext;
