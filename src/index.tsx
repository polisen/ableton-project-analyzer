import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase';
import { store, rrfProps } from 'app/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactReduxFirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
