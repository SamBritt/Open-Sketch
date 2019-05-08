import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'

export default class FriendsSearch extends Component {

    state = {
        search: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleAddfriend = (event) => {
        event.preventDefault();

        ApiManager.getAllUsers()
            .then(users => users.find(user => user.userName.toLowerCase() === this.state.search.toLowerCase()))
            .then(matchedUser => this.props.addFriend(matchedUser))
            .then(() => this.setState({
                search: ""
            }))

    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <form>
                        <label>Add New Friend</label>
                        <input type="text"
                            id="search"
                            value={this.state.search}
                            onChange={this.handleFieldChange}
                            required 
                            placeholder = "Username"/>
                        <button type="button"
                            onClick={this.handleAddfriend}>Search</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}