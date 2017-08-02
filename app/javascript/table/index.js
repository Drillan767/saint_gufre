import React from 'react';
import ReactTable from 'react-table';
import $ from 'jquery';

const columns = [{
    Header: ' ',
    accessor: 'path',
    Cell: row => (
        <input
            type="checkbox"
            value={row.value}
        />
    )
}, {
    Header: 'Fichier',
    accessor: 'path',
    Cell: row => {
        let filename = row.value.split('/').pop();

        return <p>{filename}</p>
    }

}, {
    Header: 'Lecture',
    accessor: 'path',
    Cell: row => {
        let filename = row.value.split('/').pop();
        let format = filename.split('.')[1];

        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                }}
            >

                {
                    ['ogg', 'mp3', 'wav'].includes(format) ?
                        <audio controls>
                            <source src={ row.value } />
                        </audio> :
                        ' - '
                }
            </div>
            )

    }
}, {
    Header: 'Tags',
    accessor: 'tags',
    Cell: row => {
        /* @Todo: Mettre en place ce système de tag par array */
        let tags = row.value.replace(/[^a-zA-Z0-9]/g, "");

        return <p>{tags}</p>

        /*{ tags.split(' ').map(function(tag, i) {
            return (
                <span key={ i } className="chip">{ tag }</span>
            )
        })}*/
    }
}, {
    Header: "Date d'ajout",
    accessor: 'created_at',
    Cell: row => {
        let date = new Date(row.value);
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                }}
            >
                <p>{ date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() }</p>
            </div>
        )
    }
}, {
    Header: "Action",
    Cell: row => {

        return (
            <a href="/edit/1" className="btn btn-white btn-default active">
                <i className="fa fa-cog" aria-hidden="true" /> Supprimer
            </a>
        )
    }
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
            <form action="/download/zip">
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                />
                <input type="submit" value="Télécharger" />
            </form>
        )
    }
}