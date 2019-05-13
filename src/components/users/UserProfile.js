import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import UserTagSearch from '../search/UserTagSearch'

export default class UserProfile extends Component {

    handleAddFriend = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        ApiManager.getAllUsers()
            .then(users => users.find(user => user.userName.toLowerCase() === this.props.match.params.userName.toLowerCase()))
            .then(matchedUser => this.props.addFriend(matchedUser))
    }

    render() {
        console.log(sessionStorage.getItem("userName"))
        return (
            <React.Fragment>
                <div>
                    <span className="mr-1">
                    
                    </span>
                    {
                        this.props.usersImages.filter(user =>
                            this.props.match.params.userName === user.userName
                        )
                            .map(foundUser =>
                                <div key={foundUser.id}>
                                    <span>
                                        <h1>{foundUser.userName}</h1>
                                        <button
                                            onClick={this.handleAddFriend}>
                                            Add Friend
                                        </button>
                                    </span>
                                    {
                                        foundUser.images.map(image =>
                                            <div key={image.id} className="card">
                                                <img src={image.imageUrl}></img>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                    }
                </div>

            </React.Fragment>
        )
    }
}