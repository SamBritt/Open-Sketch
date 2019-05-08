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
                                <button onClick={this.handleLogin}>Login</button>
                                <button type = "button"
                                    onClick = {() => this.props.history.push("/register")}>Register</button>
                            </footer>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}