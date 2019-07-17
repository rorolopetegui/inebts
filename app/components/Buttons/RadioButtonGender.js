import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonGender() {
    const [value, setValue] = React.useState('hombre');

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
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
