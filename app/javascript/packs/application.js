/* eslint no-console:0 */

import React from 'react';
import ReactDOM from 'react-dom'
import GufreBox from '../gufremagicbox'
import Login from '../auth';

console.log();
let url = window.location.pathname;

if(url === '/') {
    ReactDOM.render(React.createElement(GufreBox, null), document.getElementById('gufrebox'));
} else if(url === '/users/sign_in') {
    ReactDOM.render(React.createElement(Login, null), document.getElementById('login'))
}
