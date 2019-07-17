import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './btnStyle.css'

const style = {

}

/* eslint-disable global-require */
class CustomButton extends Component {
    state = {
        hover: false,
    }

    onMouseEnter = () => {
        this.setState(state => ({ hover: !state.hover }))
    }
    render() {
        const { children, action } = this.props
        return (
            <div>
                <input type="radio" name="gender" value={children} onChange={action} />
                {children}
            </div>
        )
    }
}
/* eslint-enable global-require */
CustomButton.propTypes = {
    children: PropTypes.node.isRequired,
    action: PropTypes.func.isRequired,
}

export default CustomButton
