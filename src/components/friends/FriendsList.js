import React, { Component } from 'react'
import FriendSearch from './FriendSearch'
import { Link } from 'react-router-dom'
import './friends.css'

export default class FriendsList extends Component {

    handleRemoveFriend = (event) => {
        event.preventDefault();
        this.props.removeFriend(event.target.id)

    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <FriendSearch addFriend={this.props.addFriend} />
                    <h2 className="is-large">Friends List</h2>
                    <div className="friendWrapper">
                        {
                            this.props.friends.map(friend =>
                                <div key={friend.user.id}>
                                    <div className="friend-card card p-4 mb-2">
                                        <Link to={`/profile/${friend.user.userName}`}>
                                            <h2 className="is-large" >{friend.user.userName}</h2>
                                        </Link>
                                        <button className="button is-rounded is-danger" id={friend.id} onClick={this.handleRemoveFriend}>Remove Friend</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}