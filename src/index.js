import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import reducer from './reducers/index';
import App from './containers/App';
import DevTools from './containers/DevTools';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ga from 'react-ga';
import {Router, Route, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import runtime from 'offline-plugin/runtime';

injectTapEventPlugin();

let initialState = {};

const thunk = store => next => action =>
    typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action);

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
let middlewares;
let store;

if (document.location.hostname !== "localhost") {
    runtime.install({
        onUpdating: () =>{
            console.log('SW Event:', 'onUpdating');
        },
        onUpdateReady: () =>{
            console.log('SW Event:', 'onUpdateReady');
            runtime.applyUpdate();
        },
        onUpdated: () =>{
            console.log('SW Event:', 'onUpdated');
            window.location.reload();
        },
        onUpdateFailed: () =>{
            console.log('SW Event:', 'onUpdateFailed');
        }
    });
    ga.initialize('UA-3215015-7');
    ga.pageview(document.location.pathname);
    middlewares = applyMiddleware(
        thunk,
        routerMiddleware(appHistory)
    );
} else {
    const logger = store => next => action => {
        console.group(action.type);
        console.info('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        console.groupEnd(action.type);
        return result
    };

    middlewares = compose(
        applyMiddleware(
            routerMiddleware(appHistory),
            logger,
            thunk
        ),
        DevTools.instrument()
    );
}

store = createStore(
    combineReducers({
        ...reducer,
        routing: routerReducer
    }), initialState, middlewares);

const history = syncHistoryWithStore(appHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="/dir" component={App}/>
                <Route path="/dir//" component={App}/>
                <Route path="/dir/:from//" component={App}/>
                <Route path="/dir//:to/" component={App}/>
                <Route path="/dir/:from/:to/" component={App}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
