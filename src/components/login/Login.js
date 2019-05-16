import React, { Component } from 'react'

export default class Login extends Component {

    state = {
        userName: "",
        password: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8088/users`)
            .then(r => r.json())
            .then(userList => {
                let foundUserName = userList.find(user =>
                    user.userName.toLowerCase() === this.state.userName.toLowerCase() && user.password.toLowerCase() === this.state.password.toLowerCase()
                )
                if (foundUserName) {
                    sessionStorage.setItem("userID", foundUserName.id)
                    sessionStorage.setItem("userName", foundUserName.userName)
                    this.props.onLogin();
                    this.props.history.push("/home")
                } else {
                    window.alert("Username/Password Not Found")
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="container">
                        <form>
                            <div className="field">
                                <label htmlFor="userNameInput" className="label">Username</label>
                                <div className="control has-icons-left">
                                    <input onChange={this.handleFieldChange}
                                        type="text"
                                        id="userName"
                                        required
                                        autoFocus=""
                                        placeholder="Username"
                                        className="input" />


                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" htmlFor="passwordInput">
                                    Password:
                        </label>
                                <div className="control has-icons-left">
                                    <input className="input" onChange={this.handleFieldChange}
                                        type="text"
                                        id="password"
                                        required
                                        autoFocus=""
                                        placeholder="Password" />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <footer>
                                    <button className="button is-rounded button is-success" onClick={this.handleLogin}>Login</button>
                                    <button className="button is-rounded is-primary" type="button"
                                        onClick={() => this.props.history.push("/register")}>Register</button>
                                </footer>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}