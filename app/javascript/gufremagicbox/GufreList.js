// @flow
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import keycode from 'keycode';
import Button from 'material-ui/Button';
import $ from 'jquery';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DownloadIcon from 'material-ui-icons/FileDownload';

let counter = 0;

const columnData = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Fichier' },
    { id: 'lecture', numeric: false, disablePadding: false, label: 'Lecture' },
    { id: 'tags', numeric: true, disablePadding: false, label: 'Tags' },
    { id: 'creation_time', numeric: true, disablePadding: false, label: 'Date d\'ajout' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

class EnhancedTableHead extends Component {
    static propTypes = {
        onRequestDateSort: PropTypes.func.isRequired,
        onRequestNameSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    createSortNameHandler = property => event => {
        this.props.onRequestNameSort(event, property);
    };

    createSortDateHandler = property => event => {
        this.props.onRequestDateSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell checkbox>
                        <Checkbox onChange={onSelectAllClick} />
                    </TableCell>
                    {columnData.map(column => {
                        // console.log(column.id);
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                disablePadding={column.disablePadding}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={order}
                                    onClick={() => { column.id === 'name' ?
                                        this.createSortNameHandler(column.id) :
                                        column.id === 'creation_date' ?
                                        this.createSortDateHandler(column.id) : console.log('merde') }}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyleSheet = createStyleSheet('EnhancedTableToolbar', theme => ({

    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
            color: theme.palette.accent.A700,
            backgroundColor: '#78909C',
        }
            : {
            color: theme.palette.accent.A100,
            backgroundColor: theme.palette.accent.A700,
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0
                    ? <Typography type="subheading">
                        {numSelected} fichier(s) sélectionnés
                    </Typography>
                    : <Typography type="title">Fichiers</Typography>}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0
                    ? <IconButton aria-label="Delete">
                        <DownloadIcon />
                    </IconButton>
                    :  ''}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyleSheet)(EnhancedTableToolbar);

const styleSheet = createStyleSheet('EnhancedTable', theme => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
}));

class EnhancedTable extends Component {

    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [],
        open: false,
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

    handleRequestNameSort = (event, property) => {
/*        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        let reA = /[^a-zA-Z]/g;
        let reN = /[^0-9]/g;
        function sortAlphaNum(a,b) {
            let aA = a.replace(reA, "");
            let bA = b.replace(reA, "");
            if(aA === bA) {
                let aN = parseInt(a.replace(reN, ""), 10);
                let bN = parseInt(b.replace(reN, ""), 10);
                return aN === bN ? 0 : aN > bN ? 1 : -1;
            } else {
                return aA > bA ? 1 : -1;
            }
        }

        const data = this.state.data.sort(sortAlphaNum);

        this.setState({ data, order, orderBy });*/

        console.log(event);
    };

    handleRequestDateSort = (event, property) => {
        /*const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data = this.state.data.sort(
            (a, b) => (order === 'desc' ? (b[orderBy] > a[orderBy] ? -1 : 1) : (b[orderBy] < a[orderBy] ? -1 : 1))
        );

        this.setState({ data, order, orderBy });*/
        console.log('handleRequestDateSort cliqué');
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const classes = this.props.classes;
        const { data, order, orderBy, selected } = this.state;

        return (
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <Table>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestNameSort={this.handleRequestDateSort}
                        onRequestDateSort={this.handleRequestNameSort}
                    />
                    <TableBody>
                        {data.map(n => {

                            const isSelected = this.isSelected(n.id);

                            let filename = n.path.split('/').pop();
                            let format = filename.split('.')[1];
                            let tags = n.tags.replace(/[^a-zA-Z0-9]/g, "");
                            let date = new Date(n.created_at);

                            return (
                                <TableRow
                                    hover
                                    onClick={event => this.handleClick(event, n.id)}
                                    onKeyDown={event => this.handleKeyDown(event, n.id)}
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex="-1"
                                    key={n.id}
                                    selected={isSelected}
                                >
                                    <TableCell checkbox>
                                        <Checkbox checked={isSelected} value={n.path} name="selected_files[]" />
                                    </TableCell>
                                    <TableCell disablePadding>
                                        {filename}
                                    </TableCell>
                                    {
                                        ['mp3', 'ogg', 'wav'].includes(format) ?
                                            <TableCell>
                                                <audio controls>
                                                    <source src={ n.path } />
                                                </audio>
                                            </TableCell>
                                            :
                                            <TableCell />
                                    }

                                    <TableCell numeric>
                                        { tags.split(' ').map(function(tag, i) {
                                            return (
                                                <span key={ i } className="chip">{ tag }</span>
                                            )
                                        })}
                                    </TableCell>

                                    <TableCell numeric>
                                        { date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() }
                                    </TableCell>
                                    <TableCell>

                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(EnhancedTable);