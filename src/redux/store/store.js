import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// composeEnhancers(applyMiddleware(thunk, logger))

// // Ejemplo de efecto
// function logger({ getState }) {
//   return (next) => (action) => {
//     console.log('will dispatch', action);

//     // Call the next dispatch method in the middleware chain.
//     const returnValue = next(action);

//     console.log('state after dispatch', getState());

//     // This will likely be the action itself, unless
//     // a middleware further in chain changed it.
//     return returnValue;
//   };
// }
