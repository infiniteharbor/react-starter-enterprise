import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '~components/App';
import configureStore from '~@store/store';

export const appConfig = {
  name: 'react-starter',
  version: require('../../package.json').version
};

const render = (config) => {
  ReactDOM.render(
    <Provider store={configureStore(config)}>
      <App />
    </Provider>,
    document.getElementById('app-root')
  );
};

render(appConfig);
