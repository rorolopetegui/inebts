import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialState, deleteCitizen, selectCitizen, addCitizen } from '../../reducers/pageState'
import { push } from 'connected-react-router'

import { CustomButton } from '../Buttons'

const styles = {

}
/* eslint-disable global-require */
class HomeComponent extends Component {
  gotoCitizenPage = () => {
    this.props.push('/addCitizen')
  }
  tellMyAge = (timestamp) => {
    var birthday = new Date(timestamp)
    var now = new Date()
    const diffTime = Math.abs(now.getTime() - birthday.getTime())
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))
    return diffYears
  }
  getMyBirthday = (timestamp) => {
    var birthday = new Date(timestamp)
    var month = birthday.getMonth() + 1
    var day = birthday.getDate()
    var year = birthday.getFullYear()
    return day + "/" + month + "/" + year
  }
  handleDeleteCitizen = (index) => {
    this.props.deleteCitizen(index);
  }
  handleEditCitizen = (index) => {
    this.props.selectCitizen(index);
    this.gotoCitizenPage();
  }

  render() {
    const citizens = this.props.citizens
    return (
      <div>
        {citizens.length > 0 &&
          <table>
            <thead>
              <tr>
                <td>Nombre</td>
                <td>Apellido paterno</td>
                <td>Apellido materno</td>
                <td>Sexo</td>
                <td>Estado</td>
                <td>Ciudad</td>
                <td>Edad</td>
                <td>Cumpleaños</td>
                <td>Acciones</td>
              </tr>
            </thead>
            <tbody>
              {
                citizens.map((item, index) =>
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.fLastName}</td>
                    <td>{item.mLastName}</td>
                    <td>{item.gender}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td>{this.tellMyAge(item.birthday)}</td>
                    <td>{this.getMyBirthday(item.birthday)}</td>
                    <td>
                      <CustomButton action={this.handleEditCitizen.bind(this, index)}>Editar</CustomButton>
                      <CustomButton action={this.handleDeleteCitizen.bind(this, index)}>Borrar</CustomButton>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        }
        {citizens.length === 0 &&
          <h1>Por favor ingrese ciudadanos para comenzar</h1>
        }
        <CustomButton action={this.gotoCitizenPage.bind(this)}>Agregar</CustomButton>
      </div>
    )
  }
}
/* eslint-enable global-require */
HomeComponent.propTypes = {
  citizens: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  const p = state.get('pageState', initialState)
  return {
    citizens: p.citizens,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push,
      deleteCitizen,
      selectCitizen,
      addCitizen
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent)
