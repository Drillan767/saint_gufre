import React from 'react';
import ReactTable from 'react-table';
import $ from 'jquery';

const columns = [{
    Header: ' ',
    accessor: 'path',
    id: 'checkboxes',
    filterable: false,
    Cell: row => (
        <input
            type="checkbox"
            name="file_selected[]"
            value={row.value}
        />
    )
}, {
    Header: "Fichier",
    accessor: "path",
    id: "files",

    sortMethod: (a, b) => {
        let reA = /[^a-zA-Z]/g;
        let reN = /[^0-9]/g;
        let afile = a.split("/").pop();
        let bfile = b.split("/").pop();
        let aA = afile.replace(reA, "");
        let bA = bfile.replace(reA, "");

        if (aA === bA) {
            let aN = parseInt(afile.replace(reN, ""), 10);
            let bN = parseInt(bfile.replace(reN, ""), 10);

            return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            return aA > bA ? 1 : -1;
        }
    },

    Cell: row => {
        const filename = row.value.split("/").pop();

        return <p>{filename}</p>;
    },
    filterMethod: (filter, row) => {
        const filename = row[filter.id].split("/").pop().toLowerCase();

        return filename.startsWith(filter.value);
    }
}, {
    Header: 'Lecture',
    accessor: 'path',
    filterable: false,

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
    id: 'tags',
    Cell: row => {
        let tags = row.value.replace(/[^a-zA-Z0-9\s]/g, "");
        let tag = [];
        tags.split(' ').map(function(value, i) {
            tag.push(<span key={i}>{value}</span>);
        });

        return tag;

    },
    filterMethod: (filter, row) => {
        const tags = row[filter.id].replace(/[^a-zA-Z0-9\s]/g, "");
        let tag = [];
        tags.split(' ').map(function(value) {
            tag.push(value);
        });

        return tag.some(
            function(v){
                return v.indexOf(filter.value)>=0
            }
        )

    }
}, {
    Header: "Date d'ajout",
    accessor: 'created_at',
    sortMethod: (a, b) => {
        return a > b ? 1 : -1;
    },

    Cell: row => {
        let date = new Date(row.value);
        let created_at = date.getDate() + ' / ' + (date.getMonth()+1) + ' / ' + date.getFullYear();
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                }}
            >
                <p>{ created_at }</p>
            </div>
        )
    },
    filterMethod: (filter, row) => {
        let filterId = new Date(row[filter.id]);
        let value = filterId.getDate() + ' / ' + (filterId.getMonth()+1) + ' / ' + filterId.getFullYear();
        let date = [];
        value.split(' / ').map(function(d) {
            date.push(d);
        });

        return date.some(
            function(v){
                return v.indexOf(filter.value)>=0
            }
        )
    }

}, {
    Header: "Action",
    accessor: 'id',
    filterable: false,
    Cell: row => (
        <a href={"/home/" + row.value}>Supprimer</a>
    )
}];

export default class Index extends React.Component {

    state = {
        data: [],
    };

    componentDidMount(){
        let self = this;
        $.ajax({
            url: '/all_files',
            method: 'GET',
            dataType: 'json',
            success: function(data){
                self.setState({data: data});
            }
        })
    }

    render() {

        return (
            <form action="/download/zip">
                <ReactTable
                    data={this.state.data}
                    noDataText='Pas encore de fichier'
                    columns={columns}
                    filterable
                    filtered={this.state.filtered}
                    onFilteredChange={filtered => this.setState({filtered})}
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                />
                <input type="submit" value="Télécharger" />
            </form>
        )
    }
}