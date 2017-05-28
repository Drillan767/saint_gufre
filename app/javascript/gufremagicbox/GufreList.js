import React from 'react';
import GufreFile from './GufreFile';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';

export default class GufreList extends React.Component {

    render() {

        $('.gufrelist tr').click(function(event) {
            if (event.target.type !== 'checkbox') {
                $(':checkbox', this).trigger('click');
            }
            console.log("click'd");
        });

        return(
            <form action="/download/zip">
                <TextField
                    hintText="Entrer un terme à rechercher"
                    floatingLabelText="Rechercher dans le tableau"
                />
                <RaisedButton label="Rechercher" primary={true} />
                <Table className="gufrelist">
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn />
                            <TableHeaderColumn>Fichier</TableHeaderColumn>
                            <TableHeaderColumn>Lecture</TableHeaderColumn>
                            <TableHeaderColumn>Tags</TableHeaderColumn>
                            <TableHeaderColumn>Date d'ajout</TableHeaderColumn>
                            <TableHeaderColumn />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { this.props.datas.map(function(data) {
                            return (
                                <GufreFile key={ data.id } data = { data }/>
                            )
                        })}

                    </TableBody>
                </Table>
                <RaisedButton label="Télécharger" primary={true} type="submit"/>
            </form>

        )
    }
}
