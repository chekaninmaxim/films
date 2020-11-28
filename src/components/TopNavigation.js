import React from 'react'
import PropTypes from 'prop-types'

import RegisterForm from './forms/RegisterForm'
import LoginForm from './forms/LoginForm'

const TopNavigation = ({showAddForm}) => (
    <div className='ui secondary pointing menu'>
        <a href="/" className='item'>
            Home
        </a>
        <a href="#" className='item' onClick={showAddForm}>
            <i className='icon plus' />
            Add new film
        </a>
        <div className="right menu">
            <RegisterForm className="item" />
            <LoginForm className="item" />
        </div>
    </div>
)

TopNavigation.propTypes = {
    showAddForm: PropTypes.func.isRequired,
}

export default TopNavigation

