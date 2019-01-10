import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './home';
import Mails from './mails';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrowserRouter>
    <div>
        <Route exact path='/' component={Home}/>
        <Route exact path='/mails' component={Mails}/>		
    </div>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
