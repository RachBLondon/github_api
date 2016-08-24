import React, { Component } from 'react'
import {Link} from 'react-router'
import {logOut} from './../../actions'
import { connect } from 'react-redux'
import { ROOT_URL } from '../../constants/host_url'

class Header extends Component {

    render(){
        const logoutUrl = ROOT_URL + '/logout'
        return (
            <nav className="navbar navbar-light">
                <ul className="nav navbar-nav">
                    <li className="nav-item"><a href={logoutUrl}> Sign Out</a></li>
                    <li className="nav-item"><Link to="profile">Profile</Link></li>
                    <li className="nav-item"><Link to="shortlist">Shortlist</Link></li>
                    <li className="nav-item"><Link to="search">Search</Link></li>
                </ul>
            </nav>
        )
    }
}

export default connect(null, {logOut})(Header)