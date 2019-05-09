import React, { Component } from 'react'

import { Link } from "react-router-dom"

export default class UserImageList extends Component {


    render() {
        console.log(this.props.usersImages)
        console.log('asd')
        return (
            <React.Fragment>
                <div>
                    {
                        this.props.usersImages.map(e =>
                            <div>
                                <h2>{e.images.length > 0 ? <Link>{e.userName}</Link>  : null}</h2>
                                {
                                    e.images.map(userImage => 
                                        <div className = "card">
                                            <img src = {userImage.imageUrl} alt = "Image"></img>
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