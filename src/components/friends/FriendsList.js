import React, { Component } from 'react'
import FriendSearch from './FriendSearch'
import {Link} from 'react-router-dom'

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
                                <h4><Link to = {`/profile/${friend.user.userName}`}>{friend.user.userName}</Link></h4>
                                <button className = "button is-rounded is-danger" id = {friend.id} onClick = {this.handleRemoveFriend}>Remove Friend</button>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}