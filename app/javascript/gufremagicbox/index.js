import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logo from '../assets/logo.png';
import GufreList from './GufreList';
import GufreForm from './GufreForm';
injectTapEventPlugin();

export default class Index extends React.Component {

    render() {

        return (

            <MuiThemeProvider theme={createMuiTheme()}>
                <div>
                    <div className="logo">
                        <a rel="nofollow" data-method="delete" href="/users/sign_out">
                            <img src={logo} alt=""/>
                        </a>
                    </div>
                    <GufreForm />
                    <GufreList />
                </div>
            </MuiThemeProvider>
        )
    }
}