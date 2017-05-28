import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GufreList from './GufreList';
import GufreForm from './GufreForm';
import $ from 'jquery';
injectTapEventPlugin();

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        let self = this;
        $.ajax({
            url: '/all_files',
            method: 'GET',
            dataType: 'json',
            success: function(data){
                self.setState({data: data});
                console.log('ajax executé');
            }
        })
    }


    render() {
        return (

            <MuiThemeProvider>
                <div>
                    <GufreForm />
                    <GufreList datas={ this.state.data }/>
                </div>
            </MuiThemeProvider>
        )
    }
}