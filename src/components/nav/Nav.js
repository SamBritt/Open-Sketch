import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Nav, NavItem, NavLink } from 'reactstrap';

class NavBar extends Component {
    render() {
        return (
            <Nav>
                <NavItem>
                    <Link to ="/home">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to ="/profile">Profile</Link>
                </NavItem>
                <NavItem>
                    <Link to ="/friends">Friends</Link>
                </NavItem>
                <Link className="mr-1" onClick={() => sessionStorage.clear()} to="/">Logout</Link>
            </Nav>
        )
    }
}
export default NavBar