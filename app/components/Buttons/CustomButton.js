import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './btnStyle.css';

const style = {
    container: {
        width: '200px',
        borderRadius: '16px',
        border: '1px solid black',
        textAlign: 'center',
    },
}

/* eslint-disable global-require */
class CustomButton extends Component {
    state = {
        hover: false,
    };

    onMouseEnter = () => {
        this.setState(state => ({ hover: !state.hover }));
    };
    render() {
        const { classes, children, action } = this.props;
        const { hover } = this.state;
        return (
            <div
                style={classes ? classes.container : style.container}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseEnter.bind(this)}
                onClick={action}
                className={"btn " + (hover ? "hover" : "")}
            >
                <span style={style.innerContent}>{children}</span>
            </div>
        );
    }
}
/* eslint-enable global-require */
CustomButton.propTypes = {
    children: PropTypes.node.isRequired,
    action: PropTypes.func.isRequired,
    classes: PropTypes.object,
};

export default CustomButton;
