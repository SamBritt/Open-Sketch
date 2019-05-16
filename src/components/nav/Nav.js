import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './nav.css'

class NavBar extends Component {
    state = {
        currentUser: ""
    }
    componentDidMount() {
        let currentUser = sessionStorage.getItem("userName")
        this.setState({currentUser : currentUser})
    }

    render() {
        console.log(this.state.currentUser)
        return (
            <nav className="main-nav flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/profile/${this.state.currentUser}`}>Profile</Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link to="/friends">Friends</Link>
                    </li>
                    <Link className="mr-1" onClick={() => sessionStorage.clear()} to="/">Logout</Link>
                </ul>
            </nav>
        )
    }
}
export default NavBar