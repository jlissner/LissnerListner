import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline  } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { UserProvider } from '../../context/UserContext';
import { CookbookProvider } from '../../context/CookbookContext';
import { NavProvider } from '../../context/NavContext';
import Layout from '../Layout/Layout';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5b8266',
      light: '#a5baab',
      dark: '#223026',
    },
    secondary: {
      main: '#a93f55',
      light: '#d096a2',
      dark: '#3e171f',
    },
    accent1: {
      main: '#edae49',
      light: '#f5d29b',
      dark: '#57401b',
    },
    accent2: {
      main: '#30638e',
      light: '#8ea9c1',
      dark: '#122434',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

function App() {

  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <UserProvider>
          <NavProvider>
            <CookbookProvider>
              <BrowserRouter>
                <Layout />
              </BrowserRouter>
            </CookbookProvider>
          </NavProvider>
        </UserProvider>   
      </MuiThemeProvider>
    </>
  )
}

export default App;
