import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, NavItem, NavLink } from 'reactstrap';

class NavBar extends Component {
    render() {
        return (
            <nav className = "flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className = "nav-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className = "nav-item">
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className = "nav-item">
                        <Link to="/friends">Friends</Link>
                    </li>
                    <Link className="mr-1" onClick={() => sessionStorage.clear()} to="/">Logout</Link>
                </ul>
            </nav>
        )
    }
}
export default NavBar