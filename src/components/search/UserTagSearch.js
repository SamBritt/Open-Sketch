import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'


export default class UserTagSearch extends Component {
    state = {
        searchString: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    }
    handleSearch = (event) => {
        event.preventDefault();

        ApiManager.getAllUsersImages()
            .then(user => user.find(profileUser => 
                this.props.match.params.userName === profileUser.userName
            ))
            .then(user => console.log(user.images))
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <label htmlFor="userTagSearch" >Tags: </label>
                    <input type="text"
                        id="search"
                        value={this.state.searchString}
                        onChange={this.handleFieldChange}
                        placeholder="Faces, Torsos, etc ..." />
                        <button onClick = {this.handleSearch}></button>
                </div>
            </React.Fragment>
        )
    }
}