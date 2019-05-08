import React, { Component } from 'react'
import FriendSearch from './FriendSearch'

export default class FriendsList extends Component {
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
                                <button>Remove Friend</button>
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}