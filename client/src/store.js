import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialState = {};

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//creates redux
const store = createStore(
  // rootReducer,
  // initialState,
  // compose(
  //   applyMiddleware(...middleware),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )



  // rootReducer,
  // initialState,
  // compose(
  //   applyMiddleware(...middleware),
  //   window.navigator.userAgent.includes('Chrome') ?
  //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
  // ),

  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )

);

export default store;