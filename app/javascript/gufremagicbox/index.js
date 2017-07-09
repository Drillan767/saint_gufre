import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GufreList from './GufreList';
import GufreForm from './GufreForm';
injectTapEventPlugin();

export default class Index extends React.Component {

    render() {
        return (

            <MuiThemeProvider>
                <div>
                    <GufreForm />
                    <GufreList />
                </div>
            </MuiThemeProvider>
        )
    }
}