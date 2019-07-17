import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedTextField } from '../TextFields';
import { RadioButtonGender } from '../Buttons';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '50%',
        margin: '0 auto',
    },
    test: {
        display: 'inline-block',
        margin:'auto',
    },
}));

function AddCitizenForm(props) {
    const classes = useStyles();
    /*const [values, setValues] = React.useState({
        text: '',
    });*/

    /*const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };*/
    const { label, required } = props;
    return (
        <div>
            <div className={classes.container}>
                <OutlinedTextField label={"Nombre"} required />
                <OutlinedTextField label={"Apellido Paterno"} required />
                <OutlinedTextField label={"Apellido Materno"} required />
            </div>
            <div className={classes.container}>
                <div className={classes.test}>
                    <RadioButtonGender />
                </div>
            </div>
        </div>
    );
}

export default AddCitizenForm;