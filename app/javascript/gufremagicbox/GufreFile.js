import React from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import $ from 'jquery';

export default class GufreFile extends React.Component {

    constructor(props){
        super(props);
        this.annihililation = this.annihililation.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.state = {
            open: false,
        };
    }

    annihililation(){
        let self = this;
        $.ajax({
            url: '/file_destroy/' + this.props.data.id,
            method: 'DELETE',
            dataType: 'json',
            data: {"method": "delete"},
            complete: function(){
                self.handleTouchTap();
                window.location.reload();
            }
        })
    };

    handleTouchTap() {
        this.setState({
            open: true,
        });
    };

    handleRequestClose(){
        this.setState({
            open: false,
        });
    };

    render() {

        let filename = this.props.data.path.split('/').pop();
        let format = filename.split('.')[1];
        let tags = this.props.data.tags.replace(/[^a-zA-Z0-9]/g, "");
        let date = new Date(this.props.data.created_at);

        const styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };

        return (
            <TableRow>
                <TableRowColumn><Checkbox value = { this.props.data.path } name="selected_files[]"/></TableRowColumn>
                <TableRowColumn>{ filename }</TableRowColumn>
                {
                    ['mp3', 'ogg', 'wav'].includes(format) ?
                        <TableRowColumn>
                            <audio controls>
                                <source src={ this.props.data.path } />
                            </audio>
                        </TableRowColumn>
                        :
                        <TableRowColumn />
                }
                <TableRowColumn style={styles.wrapper}>
                    { tags.split(' ').map(function(tag, i) {
                        return (
                            <span key={ i } className="chip">{ tag }</span>
                        )
                    })}
                </TableRowColumn>
                <TableRowColumn>{ date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() }</TableRowColumn>
                <TableRowColumn>
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="Supprimer" onClick={ () => this.annihililation() }/>
                    </IconMenu>
                    <Snackbar
                        open={this.state.open}
                        message={ filename + " a été supprimé" }
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </TableRowColumn>
            </TableRow>

        )
    }
}