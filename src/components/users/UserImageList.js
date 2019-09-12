import React, { Component } from 'react'


import { Link } from "react-router-dom"
import './userImage.css'
import UserImageCard from './UserImageCard'
import FullImageCard from './FullImageCard'
import { Spring, Trail, config, useSpring, useTransition, animated } from 'react-spring/renderprops'

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
                                        <Link to={`/profile/${user.userName}`} > <h1 className="userLink">
                                            {user.userName}<hr width="500px" /></h1></Link>
                                        : null
                                }
                                </h2>
                                <div className="gallery">
                                    <Trail items={user.images} keys={item => item.id}
                                        config={{ duration: 1200 }}
                                        from={{ opacity: 0, marginTop: 5 }}
                                        to={{ opacity: 1, marginTop: 0 }}>
                                        {item => props =>
                                            <FullImageCard style = {props} key={item.id} imageUrl={item.imageUrl} />
                        }
                                    </Trail>
                                    {/* {

                                        user.images.map(userImage =>

                                            // <UserImageCard key = {userImage.id} imageUrl = {userImage.imageUrl}/>
                                            <FullImageCard key={userImage.id} imageUrl={userImage.imageUrl} />
                                        )
                                    } */}
                                </div>

                            </div>


                        )
                    }

                </div>
            </React.Fragment>
        )
    }
}