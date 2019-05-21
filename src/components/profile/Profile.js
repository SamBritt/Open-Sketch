import React, { Component } from 'react'
import CurrentUserProfile from '../profile/CurrentUserProfile'
import UserProfile from '../users/UserProfile'

export default class Profile extends Component {
    render() {
        console.log(sessionStorage.getItem("userName"))
        console.log(this.props.match.params)
        return (
            <React.Fragment>
                {
                    this.props.match.params.userName === sessionStorage.getItem("userName") ?
                        <CurrentUserProfile
                            images={this.props.images}
                            categories={this.props.categories}
                            saveDrawing={this.props.saveDrawing}
                            saveDrawing2={this.props.saveDrawing2}
                            deleteDrawing={this.props.deleteDrawing} {...this.props} />

                        :

                        <UserProfile images={this.props.images}
                            usersImages={this.props.usersImages}
                            users={this.props.users}
                            addFriend={this.addFriend} {...this.props} />


                }
            </React.Fragment>
        )
    }
}