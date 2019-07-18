import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function RadioButtonGender(props) {
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="position" name="position" value={props.selectedValue} onChange={props.handleChangeAction} row>
                <FormControlLabel
                    value="hombre"
                    control={<Radio color="primary" />}
                    label="Hombre"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="mujer"
                    control={<Radio color="primary" />}
                    label="Mujer"
                    labelPlacement="end"
                />
            </RadioGroup>
        </FormControl>
    );
}

RadioButtonGender.propTypes = {
    handleChangeAction: PropTypes.func.isRequired,
    selectedValue: PropTypes.string.isRequired
};

export default RadioButtonGender;