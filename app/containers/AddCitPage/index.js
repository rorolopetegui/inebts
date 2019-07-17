import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

//Comps
import { CustomButton, Calendar } from './../../components';

//Reducers
import { initialState, addCitizen } from '../../reducers/pageState';

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
  addCitizen = () => {
    console.log("añadir citizen");
    this.props.addCitizen('Rodrigo', 'Lopetegui', 'Garcia', 'male', 'Montevideo', 'Montevideo', '10111991');
    this.props.addCitizen('Rodrigo', 'Lopetegui', 'Garcia', 'male', 'Montevideo', 'Montevideo', '10111991');
    console.log("finish citizen");
  }
  cancel = () => {
    this.props.push('/')
  }

  render() {
    return (
      <div style={styles.container}>
        {this.addCitizen()}
        <div style={styles.divInput}>
          <input
            //style={!remarkName ? classes.input : classes.inputRemarked}
            type="text"
            //value={this.state.fname}
            placeholder={"Mi nombre es"}
          //onChange={this.handleChangeName.bind(this)} 
          />
        </div>
        <div style={styles.divInput}>
          <input
            //style={!remarkName ? classes.input : classes.inputRemarked}
            type="text"
            //value={this.state.fname}
            placeholder={"Apellido paterno"}
          //onChange={this.handleChangeName.bind(this)} 
          />
        </div>
        <div style={styles.divInput}>
          <input
            //style={!remarkName ? classes.input : classes.inputRemarked}
            type="text"
            //value={this.state.fname}
            placeholder={"Apellido materno"}
          //onChange={this.handleChangeName.bind(this)} 
          />
        </div>
        <div style={styles.divInput}>
          <input type="radio" name="gender" value="male" checked />Masculino
        </div>
        <div style={styles.divInput}>
          <input type="radio" name="gender" value="female" />Femenino
        </div>
        <div style={styles.divInput}>
          <select name="select">
            <option value="Montevideo" defaultValue>Montevideo</option>
            <option value="Maldonado">Maldonado</option>
            <option value="Salto">Salto</option>
          </select>
        </div>
        <div style={styles.divInput}>
          <Calendar />
        </div>
        <CustomButton action={this.addCitizen.bind(this)}>Agregar</CustomButton>
        <CustomButton action={this.cancel.bind(this)}>Cancelar</CustomButton>
      </div>
    )
  }
}

AddCitPage.propTypes = {
  addCitizen: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addCitizen,
      push
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(AddCitPage);
