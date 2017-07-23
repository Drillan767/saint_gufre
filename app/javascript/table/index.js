import React from 'react';
import ReactTable from 'react-table';
import $ from 'jquery';

const columns = [{
    Header: 'Fichier',
    accessor: 'path' // String-based value accessors!
}, {
    Header: 'First Name',
    accessor: 'lastName' // String-based value accessors!
}, {
    Header: 'Age',
    accessor: 'age',
}];

export default class Index extends React.Component {

    state = {
        data: []
    };

    componentDidMount(){
        let self = this;
        $.ajax({
            url: '/all_files',
            method: 'GET',
            dataType: 'json',
            success: function(data){
                self.setState({data: data});
                console.log(self.state.data);
            }
        })
    }

    render() {

        return (
            <ReactTable
                data={this.state.data}
                columns={columns}
            />
        )
    }
}