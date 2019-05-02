import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { storage } from '../config/FireBaseConfig'
import TestFetch from './TestFetch'
import Canvas from './canvas/Canvas'
import FriendsList from './friends/FriendsList';
import Profile from './profile/Profile';


export default class ApplicationViews extends Component {
    state = {
        users: [],
        friends: [],
        images: [],
        categories: [],
        url: ''

    }

    handleUploadFile = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0]

            const uploadTask = storage.ref(`images/${image.name}`).put(image)
            uploadTask.on("state_changed",
                (snapshot) => {
                    console.log(snapshot)
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        console.log(url)
                        this.setState({ url })
                    })
                }
            )
        }

    }


    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    return <FriendsList />
                }} />
                <Route path="/profile" render={props => {
                    return <Profile />
                }} />
                <Route path="/friends" render={props => {
                    return <FriendsList />
                }} />
            </React.Fragment>
        )
    }
}