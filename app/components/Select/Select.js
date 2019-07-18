import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


function Select(props) {
    const classes = useStyles();

    return (
        <TextField
            id="standard-select-currency"
            select
            label={props.label}
            className={classes.textField}
            value={props.defaultValue}
            onChange={props.handleChangeAction.bind(this)}
            SelectProps={{
                MenuProps: {
                    className: classes.menu,
                },
            }}
            helperText={props.helperText}
            margin="normal"
        >
            {props.objects.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    helperText: PropTypes.string.isRequired,
    objects: PropTypes.array.isRequired,
    defaultValue: PropTypes.string.isRequired,
    handleChangeAction: PropTypes.func.isRequired
};

export default Select;