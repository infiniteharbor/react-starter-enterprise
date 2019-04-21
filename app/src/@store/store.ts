import { createStore } from 'redux';
import { rootReducer } from './reducers';
import middleware from './helpers/middleware';
import { AppConfig } from './constants/app';
import { setConfig } from './actions/app';

declare const module: any;

const configureStore = (config: AppConfig) => {
  const store = createStore( rootReducer, middleware );

  store.dispatch(setConfig(config));

  if (module.hot) {
    module.hot.accept(rootReducer, () => {
      const nextRootReducer = require('./reducers/app');
      store.replaceReducer(nextRootReducer);
    });
  }
};

export default configureStore;
