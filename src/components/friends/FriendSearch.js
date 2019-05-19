import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import "./friendSearch.css"

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
                        <div className="container">
                            <div className=" mt-1 field has-addons">
                                    <label id="find-artist" className="label">Find artists</label>
                                    <div className="control">
                                        <input className="input" type="text"
                                            id="search"
                                            value={this.state.search}
                                            onChange={this.handleFieldChange}
                                            required
                                            placeholder="Find an Artist..." />
                                    </div>

                                    <div className="control">
                                        <button className="button is-rounded is-primary" type="button"
                                            onClick={this.handleAddfriend}>Search</button>

                                    </div>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}