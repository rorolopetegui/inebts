import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initialState } from '../../reducers/pageState';
import { push } from 'connected-react-router';

import { CustomButton } from '../Buttons';

const styles = {

};
/* eslint-disable global-require */
class HomeComponent extends Component {
  loadCitizens = () => {
    return <div>hello world!</div>
  }
  addCitizen = () => {
    this.props.push('/addCitizen')
  }
  render() {
    return (
      <div>
        This is the home page

        {this.loadCitizens()}

        <CustomButton action={this.addCitizen.bind(this)}>Agregar</CustomButton>
      </div>
    );
  }
};
/* eslint-enable global-require */
HomeComponent.propTypes = {
  citizens: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const p = state.get('pageState', initialState);
  return {
    citizens: p.citizens,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      push
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
