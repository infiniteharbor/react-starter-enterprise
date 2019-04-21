import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

declare const window: any;

let middleware = null;
if ( window.location.href.indexOf('localhost') !== -1 ) {
  const logger = createLogger( { collapsed: true } );
  const devTools = window.devToolsExtension && window.devToolsExtension();
  const composable = [
    applyMiddleware(
        thunkMiddleware,
        logger
    )
  ];
  if (devTools) {
    composable.push(devTools);
  }
  middleware = compose.apply(this, composable);
} else {
  middleware = applyMiddleware(
    thunkMiddleware
  );
}

export default middleware;
