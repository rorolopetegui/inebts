import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

function OutlinedTextField(props) {
    const classes = useStyles();

    const { label, required } = props;
    return (
        <TextField
            required={required}
            id="outlined-required"
            label={label}
            onChange={props.handleChangeAction}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            defaultValue={props.dValue}
        />
    );
}

OutlinedTextField.propTypes = {
    label: PropTypes.string.isRequired,
    handleChangeAction: PropTypes.func.isRequired,
    dValue: PropTypes.string.isRequired,
    required: PropTypes.bool
};

export default OutlinedTextField;