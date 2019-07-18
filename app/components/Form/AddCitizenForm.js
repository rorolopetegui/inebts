import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

//Comps
import { OutlinedTextField } from '../TextFields';
import { RadioButtonGender } from '../Buttons';
import { Select } from '../Select';
import { Calendar } from '../Calendar'

//Material UI comps
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

//Reducers
import { initialState, addCitizen, updateCitizen, disableEdit } from '../../reducers/pageState'

const states = [
    {
        value: 'Montevideo',
        label: 'Montevideo',
        cities: [
            {
                value: 'Montevideo',
                label: 'Montevideo',
            },
            {
                value: 'Canelones',
                label: 'Canelones',
            },
        ]
    },
    {
        value: 'Maldonado',
        label: 'Maldonado',
        cities: [
            {
                value: 'Maldonado',
                label: 'Maldonado',
            },
            {
                value: 'Puntadeleste',
                label: 'Punta del este',
            },
            {
                value: 'Piriapolis',
                label: 'Piriapolis',
            }
        ]
    },
    {
        value: 'Rivera',
        label: 'Rivera',
        cities: [
            {
                value: 'Rivera',
                label: 'Rivera',
            },
            {
                value: 'Minasdecorrales',
                label: 'Minas de corrales',
            },
            {
                value: 'Tranqueras',
                label: 'Tranqueras',
            }
        ]
    },
];

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '50%',
        margin: '0 auto',
    },
    centerContent: {
        display: 'inline-block',
        margin: 'auto',
    },
    centerContentCalendar: {
        display: 'inline-block',
        margin: 'auto',
        textAlign: 'center',
    },
    button: {
        margin: '1rem'
    }
};

class AddCitizenForm extends Component {
    state = {
        name: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.name : '',
        fLastName: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.fLastName : '',
        mLastName: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.mLastName : '',
        gender: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.gender : 'hombre',
        selectedState: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.state : 'Maldonado',
        cities: states[1].cities,
        selectedCity: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.city : 'Maldonado',
        birthday: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.birthday : new Date().getTime(),
    }
    handleChangeState = (newState) => {
        var myCities = states.find((item, index) => {
            if (item.value === newState.target.value)
                return states[index]
        })
        this.setState({
            selectedState: newState.target.value,
            cities: myCities.cities,
            selectedCity: myCities.cities[0].value
        })
    }

    handleChangeChildren = (name, targeted) => data => {
        var newState = targeted ? data.target.value : data;
        this.setState({
            [name]: newState
        })
    };

    addCitizen = () => {
        const { name, fLastName, mLastName, gender, selectedState, selectedCity, birthday } = this.state
        if (!this.checkForError()) {
            if (name !== "" && fLastName !== "" && mLastName !== "" && gender !== "" && selectedState !== "" && selectedCity !== "" && birthday !== "") {
                this.props.addCitizen(name, fLastName, mLastName, gender, selectedState, selectedCity, birthday)
                this.cancel();
            } else {
                alert("Por favor complete todos los campos")
            }
        }
    }
    UpdateCitizen = () => {
        const { name, fLastName, mLastName, gender, selectedState, selectedCity, birthday } = this.state
        if (!this.checkForError()) {
            if (name !== "" && fLastName !== "" && mLastName !== "" && gender !== "" && selectedState !== "" && selectedCity !== "" && birthday !== "") {
                this.props.updateCitizen(name, fLastName, mLastName, gender, selectedState, selectedCity, birthday)
                this.cancel();
            } else {
                alert("Por favor complete todos los campos")
            }
        }
    }
    checkForError = () => {
        const { name, fLastName, mLastName } = this.state
        var ret = false;
        if (/[^a-z]/i.test(name)) {
            alert("Nombre puede contener unicamente letras")
            ret = true;
        }
        if (/[^a-z]/i.test(fLastName)) {
            alert("Apellido paterno puede contener unicamente letras")
            ret = true;
        }
        if (/[^a-z]/i.test(mLastName)) {
            alert("Apellido materno puede contener unicamente letras")
            ret = true;
        }
        return ret;
    }
    cancel = () => {
        this.props.disableEdit();
        this.props.push('/')
    }
    render() {
        return (
            <div>
                <div style={styles.container}>
                    <div style={styles.centerContent}>
                        <Typography variant="h3" gutterBottom>
                            Agregue un ciudadano
                        </Typography>
                    </div>
                </div>
                <div style={styles.container}>
                    <div style={styles.centerContent}>
                        <OutlinedTextField
                            label={"Nombre"}
                            required
                            handleChangeAction={this.handleChangeChildren("name", true)}
                            dValue={this.state.name}
                        />
                        <OutlinedTextField
                            label={"Apellido Paterno"}
                            required
                            handleChangeAction={this.handleChangeChildren("fLastName", true)}
                            dValue={this.state.fLastName}
                        />
                        <OutlinedTextField
                            label={"Apellido Materno"}
                            required
                            handleChangeAction={this.handleChangeChildren("mLastName", true)}
                            dValue={this.state.mLastName}
                        />
                    </div>
                </div>
                <div style={styles.container}>
                    <div style={styles.centerContent}>
                        <RadioButtonGender
                            selectedValue={this.state.gender}
                            handleChangeAction={this.handleChangeChildren("gender", true)}
                        />
                    </div>
                </div>
                <div style={styles.container}>
                    <div style={styles.centerContent}>
                        <Select
                            label={"Estado natal"}
                            helperText={"Seleccione su departamento"}
                            objects={states}
                            defaultValue={this.state.selectedState}
                            handleChangeAction={this.handleChangeState.bind(this)}
                        />
                        <Select
                            label={"Ciudad natal"}
                            helperText={"Seleccione su ciudad"}
                            objects={this.state.cities}
                            defaultValue={this.state.selectedCity}
                            handleChangeAction={this.handleChangeChildren("selectedCity", true)}
                        />
                    </div>
                </div>
                <div style={styles.container}>
                    <div style={styles.centerContentCalendar}>
                        <Typography variant="h8" >
                            Indique su fecha de nacimiento
                        </Typography>
                        <Calendar startDate={this.state.birthday} onChange={this.handleChangeChildren('birthday', false)} />
                    </div>
                </div>
                <div style={styles.container}>
                    <div style={styles.centerContent}>
                        <Button variant="outlined" color="primary" style={styles.button} onClick={this.cancel.bind(this)}>
                            Cancelar
                        </Button>
                        {this.props.selectedCitizenId === null &&
                            <Button variant="outlined" color="primary" style={styles.button} onClick={this.addCitizen.bind(this)}>
                                Agregar
                            </Button>
                        }
                        {this.props.selectedCitizenId !== null &&
                            <Button variant="outlined" color="primary" style={styles.button} onClick={this.UpdateCitizen.bind(this)}>
                                Editar
                            </Button>
                        }
                    </div>
                </div>

            </div >
        )
    }
}
AddCitizenForm.propTypes = {
    addCitizen: PropTypes.func.isRequired,
    updateCitizen: PropTypes.func.isRequired,
    selectedCitizenId: PropTypes.number,
    selectedCitizen: PropTypes.object,
}

const mapStateToProps = (state) => {
    const p = state.get('pageState', initialState)
    return {
        selectedCitizenId: p.selectedCitizenId,
        selectedCitizen: p.selectedCitizen,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addCitizen,
            updateCitizen,
            disableEdit,
            push
        },
        dispatch,
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddCitizenForm)
