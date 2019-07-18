import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { initialState, addCitizen } from '../../reducers/pageState'
import { push } from 'connected-react-router'

//Material UI comps
import Button from '@material-ui/core/Button'
import { SimpleTable } from '../Table';
import Typography from '@material-ui/core/Typography';

import faker from 'faker';

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
  button: {
    margin: '1rem'
  }
}

const numberOfMocks = 5;

/* eslint-disable global-require */
class HomeComponent extends Component {
  gotoCitizenPage = () => {
    this.props.push('/addCitizen')
  }
  generateMock = () => {
    for (let i = 0; i < numberOfMocks; i++) {
      var azar = Math.round(Math.random())
      var randomName = faker.name.firstName()
      var fLastName = faker.name.lastName()
      var mLastName = faker.name.lastName()
      var gender = azar === 1 ? "hombre" : "mujer"
      var state = faker.address.state()
      var city = faker.address.city()
      var birthday = faker.date.past(60).getTime()
      console.log("trying to add")
      console.log("randomName: " + randomName)
      console.log("fLastName: " + fLastName)
      console.log("mLastName: " + mLastName)
      console.log("gender: " + gender)
      console.log("state: " + state)
      console.log("city: " + city)
      console.log("birthday: " + birthday)
      this.props.addCitizen(randomName, fLastName, mLastName, gender, state, city, birthday)
    }
  }
  render() {
    const citizens = this.props.citizens
    return (
      <div>
        {citizens.length > 0 &&
          <SimpleTable />
        }
        {citizens.length === 0 &&
          <div style={styles.container}>
            <div style={styles.centerContent}>
              <Typography variant="h3" gutterBottom>
                Lista vacia, ingrese ciudadanos
              </Typography>
            </div>
          </div>
        }
        <div style={styles.container}>
          <div style={styles.centerContent}>
            <Button variant="outlined" color="primary" style={styles.button} onClick={this.gotoCitizenPage.bind(this)}>
              Agregar nuevo ciudadano
            </Button>
            <Button variant="outlined" color="primary" style={styles.button} onClick={this.generateMock.bind(this)}>
              Generar Mock ({numberOfMocks})
            </Button>
          </div>
        </div>
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
      addCitizen
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent)
