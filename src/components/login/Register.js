import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'

export default class Register extends Component {
    state = {
        userName: "",
        email: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleRegister = (event) => {
        event.preventDefault();

        ApiManager.getAllUsers()
            .then(userResult => {
                let matchedUser = userResult.find(user => 
                    user.userName.toLowerCase() === this.state.userName.toLowerCase()
                )
                if (matchedUser) {
                    window.alert("Username already exists!")
                } else if (this.state.userName === "" || this.state.password === "") {
                    window.alert("Please fill in the empty fields")
                } else {
                    let newUser = {
                        userName: this.state.userName,
                        password: this.state.password
                    }
                    this.props.registerUser(newUser)
                        .then(() => ApiManager.getAllUsers())
                        .then(response => response.find(user => user.userName === this.state.userName))
                        .then(matchedUser => sessionStorage.setItem("userID", matchedUser.id))
                        .then(() => this.props.onLogin())
                        .then(() => this.props.history.push("/home"))
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <form>
                        <label htmlFor="userNameInput">
                            Username:
                </label>
                        <input onChange={this.handleFieldChange}
                            type="text"
                            id="userName"
                            required
                            autoFocus=""
                            placeholder="Username" />
                        <label htmlFor="passwordInput">
                            Password:
                </label>
                        <input onChange={this.handleFieldChange}
                            type="text"
                            id="password"
                            required
                            autoFocus=""
                            placeholder="Password" />
                        <div>
                            <footer>
                                <button onClick={this.handleRegister}>Register</button>
                                <button type="button"
                                    onClick={() => this.props.history.push("/login")}>login</button>
                            </footer>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}