import React, { Component } from 'react'
import FriendSearch from './FriendSearch'

export default class FriendsList extends Component {

    handleRemoveFriend = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        this.props.removeFriend(event.target.id)

    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <FriendSearch addFriend={this.props.addFriend} />
                    <h2>Friends List</h2>
                    {
                        this.props.friends.map(friend =>
                            <div key={friend.user.id}>
                                <h4>{friend.user.userName}</h4>
                                <button id = {friend.id} onClick = {this.handleRemoveFriend}>Remove Friend</button>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}