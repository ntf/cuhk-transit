import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/index';
import App from './containers/App';
import DevTools from './containers/DevTools';
import './index.css';
import process from 'process';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let initialState = {};
let store;

const thunk = store => next => action =>
    typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action);

if (process.env.NODE_ENV === "production") {
    const middlewares = applyMiddleware(
        thunk
    );
    store = createStore(reducer, initialState, middlewares);
} else {
    const logger = store => next => action =>{
        console.group(action.type);
        console.info('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        console.groupEnd(action.type);
        return result
    };

    const middlewares = compose(
        applyMiddleware(
     //       logger,
            thunk
        ),
        DevTools.instrument()
    );

    store = createStore(reducer, initialState, middlewares);
}

ReactDOM.render(
    <Provider store={store}>
        <div>
            <App />
            {/*process.env.NODE_ENV !== 'production' ? <DevTools /> : null*/}
        </div>
    </Provider>,
    document.getElementById('root')
);
