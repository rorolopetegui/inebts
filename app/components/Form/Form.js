import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

//Comps
import CustomButton from '../Buttons/CustomButton'
import Calendar from '../Calendar/Calendar'

//Reducers
import { initialState, addCitizen, updateCitizen, disableEdit } from '../../reducers/pageState'

const styles = {
    container: {
        width: '100%',
    },
    divInput: {
        width: '100%',
    }
}

/* eslint-disable react/prefer-stateless-function */
class AddCitPage extends React.PureComponent {
    state = {
        name: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.name : '',
        fLastName: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.fLastName : '',
        mLastName: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.mLastName : '',
        gender: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.gender : 'male',
        state: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.state : 'Maldonado',
        city: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.city : 'Maldonado',
        birthday: this.props.selectedCitizenId !== null ? this.props.selectedCitizen.birthday : new Date().getTime(),
    }
    addCitizen = () => {
        const { name, fLastName, mLastName, gender, state, city, birthday } = this.state
        if (name !== "" && fLastName !== "" && mLastName !== "" && gender !== "" && state !== "" && city !== "" && birthday !== "") {
            console.log("fLastname", fLastName);
            this.props.addCitizen(name, fLastName, mLastName, gender, state, city, birthday)
            this.cancel();
        } else {
            alert("Por favor complete todos los campos")
        }
    }
    UpdateCitizen = () => {
        const { name, fLastName, mLastName, gender, state, city, birthday } = this.state
        if (name !== "" && fLastName !== "" && mLastName !== "" && gender !== "" && state !== "" && city !== "" && birthday !== "") {
            this.props.updateCitizen(name, fLastName, mLastName, gender, state, city, birthday)
            this.cancel();
        } else {
            alert("Por favor complete todos los campos")
        }
    }
    cancel = () => {
        this.props.disableEdit();
        this.props.push('/')
    }

    handleGender = (changeEvent) => {
        this.setState({
            gender: changeEvent.target.value
        })
    }
    handleName = (changeEvent) => {
        this.setState({
            name: changeEvent.target.value
        })
    }
    handleFLastName = (changeEvent) => {
        this.setState({
            fLastName: changeEvent.target.value
        })
    }
    handleMLastName = (changeEvent) => {
        this.setState({
            mLastName: changeEvent.target.value
        })
    }
    handleState = (changeEvent) => {
        this.setState({
            state: changeEvent.target.value
        })
    }
    handleCity = (changeEvent) => {
        this.setState({
            city: changeEvent.target.value
        })
    }
    handleCalendar = (selectedDate) => {
        this.setState({
            birthday: selectedDate
        })
    }


    render() {
        const { gender, state } = this.state
        return (
            <div style={styles.container}>
                <div style={styles.divInput}>
                    <input
                        //style={!remarkName ? classes.input : classes.inputRemarked}
                        type="text"
                        value={this.state.name}
                        placeholder={"Mi nombre es"}
                        onChange={this.handleName.bind(this)}
                    />
                </div>
                <div style={styles.divInput}>
                    <input
                        //style={!remarkName ? classes.input : classes.inputRemarked}
                        type="text"
                        value={this.state.fLastName}
                        placeholder={"Apellido paterno"}
                        onChange={this.handleFLastName.bind(this)}
                    />
                </div>
                <div style={styles.divInput}>
                    <input
                        //style={!remarkName ? classes.input : classes.inputRemarked}
                        type="text"
                        value={this.state.mLastName}
                        placeholder={"Apellido materno"}
                        onChange={this.handleMLastName.bind(this)}
                    />
                </div>
                <div style={styles.divInput}>
                    <input type="radio" name="gender" value="male" onChange={this.handleGender.bind(this)} checked={gender === 'male'} />Masculino
                </div>
                <div style={styles.divInput}>
                    <input type="radio" name="gender" value="female" onChange={this.handleGender.bind(this)} checked={gender === 'female'} />Femenino
                </div>
                <div style={styles.divInput}>
                    <select onChange={this.handleState.bind(this)} defaultValue={state} name="select">
                        <option value="Montevideo" >Montevideo</option>
                        <option value="Maldonado" >Maldonado</option>
                        <option value="Salto" >Salto</option>
                    </select>
                </div>
                <div style={styles.divInput}>
                    <input
                        //style={!remarkName ? classes.input : classes.inputRemarked}
                        type="text"
                        value={this.state.city}
                        placeholder={"Ciudad"}
                        onChange={this.handleCity.bind(this)}
                    />
                </div>
                <div style={styles.divInput}>
                    <Calendar startDate={this.state.birthday} onChange={this.handleCalendar.bind(this)} />
                </div>
                {this.props.selectedCitizenId === null &&
                    <CustomButton action={this.addCitizen.bind(this)}>Agregar</CustomButton>
                }
                {this.props.selectedCitizenId !== null &&
                    <CustomButton action={this.UpdateCitizen.bind(this)}>Editar</CustomButton>
                }
                <CustomButton action={this.cancel.bind(this)}>Cancelar</CustomButton>
            </div>
        )
    }
}

AddCitPage.propTypes = {
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
)(AddCitPage)
