import React, { Component } from 'react'


import { Link } from "react-router-dom"
import './userImage.css'
import UserImageCard from './UserImageCard'
import FullImageCard from './FullImageCard'
import { Spring, Trail, config, useSpring, useTransition, animated } from 'react-spring/renderprops'
import { Grid } from 'mauerwerk'
import UserCell from '../users/UserCell'

export default class UserImageList extends Component {


    render() {
        return (
            <React.Fragment>
                <div>
                    
                        {
                            this.props.usersImages.map(user =>
                                <div key={user.id}>
                                    <h2>
                                        {
                                            user.images.length ?
                                                <Link to={`/profile/${user.userName}`} > <h1 className="userLink">
                                                    {user.userName}<hr width="500px" /></h1></Link>
                                                : null
                                        }
                                    </h2>
                                    <div className="wrapper">
                                    
                                            <Grid className="grid"
                                                data={user.images}
                                                height={100}
                                                keys={item => item.id}
                                                columns={4}
                                                heights={400}
                                                margin={70}
                                                closeDelay={400}>
                                                {(data, maximized, toggle) => (
                                                    <UserCell {...data}
                                                        history={this.props.history}
                                                        maximized={maximized}
                                                        toggle={toggle} />
                                                )}

                                            </Grid>
                                        </div>
                                    
                                </div>
                            )
                        }
                    
                </div>
            </React.Fragment>
        )
    }
}