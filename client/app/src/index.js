import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import reduxThunk from 'redux-thunk'
import { AUTH_USER } from './actions/types'

import App from './components/app'
import GitHub from './components/GitHub/GitHub'
import ShortListContainer from './components/shortlist/shortlist_container'
import ProfileContainer from './components/profile/profile_container'
import rootReducer from './reducers'
import DevTools from './components/DevTools'



export default function configureStore(initialState){
  const createStoreWithMiddleWare =  createStore(
        rootReducer,
        initialState,
          compose(
            applyMiddleware(reduxThunk),
            DevTools.instrument())
          )
    return createStoreWithMiddleWare;
  }

  const store = configureStore({});


  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={GitHub}/>
          <Route path="search" component={GitHub} />
            <Route path="shortlist" component={ShortListContainer} />
            <Route path="profile" component={ProfileContainer} />
        </Route>
      </Router>
    </Provider>
  , document.querySelector('.container'));
