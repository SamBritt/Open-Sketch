import React, { Component } from 'react'

import { Link } from "react-router-dom"
import './userImage.css'

export default class UserImageList extends Component {


    render() {
        return (
            <React.Fragment>
                <div>
                    {
                        this.props.usersImages.map(e =>
                            <div key={e.id}>
                                <h2>{e.images.length > 0 ? <Link to={`/${e.userName}`}>{e.userName}</Link> : null}</h2>
                                <div className="gallery">
                                    {

                                        e.images.map(userImage =>
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