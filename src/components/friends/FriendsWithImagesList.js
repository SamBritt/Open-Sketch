import React, { Component } from 'react'

export default class FriendsWithImagesList extends Component {

    componentDidMount() {

    }

    render() {
        console.log(this.props.friendsImages)
        console.log(this.props.friends)

        return (
            <React.Fragment>
                <div>
                    {
                        this.props.friendsImages.map(friend => {
                            return friend.length > 0 &&
                                (<div key={friend[0].user.id}>
                                    <h2>{friend[0].user.userName}</h2>

                                    {friend.map(image =>
                                        <div key = {image.id} className="card">
                                            {
                                                <img src={image.imageUrl} alt="Image" />
                                            }
                                        </div>
                                    )}

                                    <div className="container">
                                        <h4>{/**/}</h4>
                                    </div>
                                </div>)
                        }
                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}