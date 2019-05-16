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
                        .then(matchedUser => {
                            sessionStorage.setItem("userID", matchedUser.id)
                            sessionStorage.setItem("userName", matchedUser.userName)
                        })
                        .then(() => this.props.onLogin())
                        .then(() => this.props.history.push("/home"))
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                <div className = "container">
                    <form>
                        <div className="field">
                            <label className="label"
                                htmlFor="userNameInput">
                                Username:
                                </label>
                            <div className="control">
                                <input className = "input" onChange={this.handleFieldChange}
                                    type="text"
                                    id="userName"
                                    required
                                    autoFocus=""
                                    placeholder="Username" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label"
                                htmlFor="passwordInput">
                                Password:
                                </label>
                            <div className="control">
                                <input className = "input" onChange={this.handleFieldChange}
                                    type="text"
                                    id="password"
                                    required
                                    autoFocus=""
                                    placeholder="Password" />
                            </div>
                        </div>
                        <div>
                            <footer>
                                <button className="button is-primary" onClick={this.handleRegister}>Register</button>
                                <button className="button is-primary" type="button"
                                    onClick={() => this.props.history.push("/")}>Back to Login</button>
                            </footer>
                        </div>
                    </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}