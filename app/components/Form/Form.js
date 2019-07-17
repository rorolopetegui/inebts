import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

//Comps
import CustomButton from '../Buttons/CustomButton'
import Calendar from '../Calendar/Calendar'

//Reducers
import { addCitizen } from '../../reducers/pageState'

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
        name: '',
        fLastname: '',
        mLastName: '',
        gender: 'male',
        state: 'Montevideo',
        city: 'Montevideo',
        birthday: '',
    }
    addCitizen = () => {
        const { name, fLastname, mLastName, gender, state, city, birthday } = this.state
        if (name !== "" && fLastname !== "" && mLastName !== "" && gender !== "" && state !== "" && city !== "" && birthday !== "")
            this.props.addCitizen(name, fLastname, mLastName, gender, state, city, birthday)
        else
            alert("Por favor complete todos los campos")
    }
    cancel = () => {
        this.props.push('/')
    }

    handleGender = (changeEvent) => {
        console.log("you changed to: ", changeEvent.target.value)
        this.setState({
            gender: changeEvent.target.value
        })
    }
    handleName = (changeEvent) => {
        console.log("you changed to: ", changeEvent.target.value)
        this.setState({
            name: changeEvent.target.value
        })
    }
    handleFLastName = (changeEvent) => {
        console.log("you changed to: ", changeEvent.target.value)
        this.setState({
            fLastname: changeEvent.target.value
        })
    }
    handleMLastName = (changeEvent) => {
        console.log("you changed to: ", changeEvent.target.value)
        this.setState({
            mLastName: changeEvent.target.value
        })
    }
    handleState = (changeEvent) => {
        console.log("you changed to: ", changeEvent.target.value)
        this.setState({
            state: changeEvent.target.value
        })
    }
    handleCalendar = (selectedDate) => {
        console.log("you pick: ", selectedDate)
        this.setState({
            birthday: selectedDate
        })
    }
    fillWithPeople = () => {
        var date = new Date()
        date.setFullYear(date.getFullYear() - 27)
        this.props.addCitizen("Rodrigo", "Lopetegui", "Garcia", "male", "Montevideo", "Montevideo", date.getTime())
        date = new Date()
        date.setFullYear(date.getFullYear() - 31)
        this.props.addCitizen("Paula", "Mesa", "Garcia", "female", "Montevideo", "Montevideo", date.getTime())
        date = new Date()
        date.setFullYear(date.getFullYear() - 35)
        this.props.addCitizen("Lucio", "Andres", "Tuvieja", "male", "SantaFe", "Rosario", date.getTime())
    }
    render() {
        const { gender, state } = this.state
        const { id } = this.props
        return (
            <div style={styles.container}>
                {this.fillWithPeople()}
                <div style={styles.divInput}>
                    <input
                        //style={!remarkName ? classes.input : classes.inputRemarked}
                        type="text"
                        //value={this.state.fname}
                        placeholder={"Mi nombre es"}
                        onChange={this.handleName.bind(this)}
                    />
                </div>
                <div style={styles.divInput}>
                    <input
                        //style={!remarkName ? classes.input : classes.inputRemarked}
                        type="text"
                        //value={this.state.fname}
                        placeholder={"Apellido paterno"}
                        onChange={this.handleFLastName.bind(this)}
                    />
                </div>
                <div style={styles.divInput}>
                    <input
                        //style={!remarkName ? classes.input : classes.inputRemarked}
                        type="text"
                        //value={this.state.fname}
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
                    <select onChange={this.handleState.bind(this)} name="select">
                        <option value="Montevideo" defaultValue={state === 'Montevideo'}>Montevideo</option>
                        <option value="Maldonado" defaultValue={state === 'Maldonado'}>Maldonado</option>
                        <option value="Salto" defaultValue={state === 'Salto'}>Salto</option>
                    </select>
                </div>
                <div style={styles.divInput}>
                    <Calendar onChange={this.handleCalendar.bind(this)} />
                </div>
                {
                <CustomButton action={this.addCitizen.bind(this)}>Agregar</CustomButton>
                }
                <CustomButton action={this.cancel.bind(this)}>Cancelar</CustomButton>
            </div>
        )
    }
}

AddCitPage.propTypes = {
    id: PropTypes.number,
    addCitizen: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addCitizen,
            push
        },
        dispatch,
    )

export default connect(
    null,
    mapDispatchToProps,
)(AddCitPage)
