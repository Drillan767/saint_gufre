// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import $ from 'jquery';

const styleSheet = createStyleSheet(theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
    }),
}));


function PaperSheet(props) {
    const classes = props.classes;

    return (
        <form className="new_user" id="new_user" action="/users/sign_in" acceptCharset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="&#x2713;" />
            <input type="hidden" value={$('meta[name="csrf-token"]')[0]['content']}/>

            <Paper className="login-paper" elevation={4}>
                <Typography type="headline" component="h1" className="login-paper-title">
                    Connexion
                </Typography>
                <div className="login-paper-field">
                    <TextField
                        id="login"
                        label="E-mail"
                        margin="normal"
                        name="user[email]"
                    />
                </div>
                <div className="login-paper-field">
                    <TextField
                        id="password"
                        label="Mot de passe"
                        type="password"
                        margin="normal"
                        name="user[password]"
                    />
                </div>

                <div className="login-paper-field">
                    <FormControlLabel
                        control={
                            <Switch
                                name="user[remember_me]"
                                value="1"
                            />
                        }
                        label="Rester connecté"
                    />
                </div>
                <div className="login-paper-button">
                    <Button raised color="primary" type="submit" className={classes.button}>
                        Connexion
                    </Button>
                </div>
            </Paper>
        </form>
    );
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PaperSheet);