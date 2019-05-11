import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/App/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

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

ReactDOM.render((
  <Provider store={store(window.__INITIAL_STATE__)}>
    <MuiThemeProvider theme={theme}>    
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
