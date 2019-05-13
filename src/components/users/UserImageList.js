import React, { Component } from 'react'

import { Link } from "react-router-dom"
import './userImage.css'

export default class UserImageList extends Component {


    render() {
        return (
            <React.Fragment>
                <div>
                    {
                        this.props.usersImages.map(user =>
                            <div key={user.id}>
                                <h2>{
                                    user.images.length ?
                                        <Link to={`/profile/${user.userName}`} > {user.userName}</Link>
                                        : null
                                }
                                </h2>
                                <div className="gallery">
                                    {

                                        user.images.map(userImage =>
                                            <div key={userImage.id} className="card">
                                                <img src={userImage.imageUrl} alt="Image"></img>
                                            </div>
                                        )
                                    }
                                </div>

                            </div>


                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}