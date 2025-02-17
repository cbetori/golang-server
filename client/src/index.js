import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './support/serviceWorker';
import AppContainer from './support/AppContainer'
import store from './support/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <AppContainer/>
    </BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
