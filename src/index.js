import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { grey, blue, red, green} from '@material-ui/core/colors';
import { CssBaseline } from '@material-ui/core';
import {BrowserRouter as Router } from 'react-router-dom'
import { ActionCableProvider } from 'react-actioncable-provider';
import { register } from './serviceWorker';
import { API_WS_ROOT } from './constants';
import dotenv from 'dotenv';

const theme = createMuiTheme({

  palette: {
    primary: grey,
    secondary: blue,
    error: red,
    success: green,
    type: 'dark'
  },
});

dotenv.config()

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <ActionCableProvider url={API_WS_ROOT}>
          <App />
        </ActionCableProvider>
    </MuiThemeProvider>
  </Router>
  , document.getElementById('root'));

register();;
