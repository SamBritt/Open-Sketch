import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { storage } from '../config/FireBaseConfig'
import Canvas from './canvas/Canvas'
import FriendsList from './friends/FriendsList';
import Profile from './profile/Profile';
import ApiManager from '../modules/ApiManager'
import Login from './login/Login'
import Register from './login/Register'

export default class ApplicationViews extends Component {
    state = {
        users: [],
        friends: [],
        images: [],
        categories: [],
        userId: ""

    }
    componentDidMount() {
        let currentUserId = sessionStorage.getItem("userID")
        this.loadAllData(currentUserId)
    }

    loadAllData = (currentUserId) => {

        const newState = {

        }

        ApiManager.getAllUsers()
            .then(users => newState.users = users)
            .then(() => ApiManager.getAll("friends", currentUserId))
            .then(friends => newState.friends = friends)
            .then(() => ApiManager.getAll("images", currentUserId))
            .then(images => newState.images = images)
            .then(() => ApiManager.getAll("categories", currentUserId))
            .then(categories => newState.categories = categories)
            .then(() => this.setState(newState))
    }

    onLogin = () => {
        this.setState({
            userId: sessionStorage.getItem("userID")
        })
        this.loadAllData(this.state.userId)
    }
    registerUser = (userToRegister) => {
        return ApiManager.postEntry(userToRegister, "users")
            .then(() => ApiManager.getAllUsers())
            .then(users => this.setState({
                users: users
            }))
    }

    isAuthenticated = () => sessionStorage.getItem("userID") !== null

    saveDrawing = (name, lessonsLearned, categoryId) => {
        //Generates a random number to ensure no 2 images are named the same in Firebase Storage
        let rand = Math.random();
        //Gets the 2nd Layer of CanvasDraw Component (drawing layer) and convverts it to a blob
        let canvasImage = document.querySelectorAll('canvas');
        canvasImage = canvasImage[1]
        canvasImage.toBlob(blob => {
            let image = new Image();
            image.src = blob;
            //Stores image to firebase
            const uploadTask = storage.ref(`images/${rand}`).put(blob)
            uploadTask.on("state_changed",
                (snapshot) => {
                    console.log(snapshot)
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    //Creates a new object used to post to our local JSON server.
                    //Uses url returned from posting to Firebase
                    //Put that url reference in the imageUrl key.
                    storage.ref('images').child(`${rand}`).getDownloadURL().then(url => {
                        const newObj = {
                            categoryId: Number(categoryId),
                            name: name,
                            imageUrl: url,
                            lessonsLearned: lessonsLearned

                        }
                        //Call to post to JSON
                        this.saveDrawing2(newObj)
                    })
                }
            )
        })
    }
    saveDrawing2 = (newDrawing) => {
        return ApiManager.postEntry(newDrawing, "images")
            .then(() => ApiManager.getAll("images"))
            .then(images => {
                this.setState({ images: images })
            })
    }

    deleteDrawing = (imgUrl, id) => {
        //Gets JSON image URL and id passed from mapping over list of images in Profile.js
        const imageRef = storage.refFromURL(imgUrl)
        //Deletes Firebase file in Storage
        imageRef.delete().then(() => {
            //Then deletes JSON Object containing that URL.
            return ApiManager.deleteEntry("images", id)
                .then(() => ApiManager.getAll("images"))
                .then(images => {
                    //Updates state with images minus the one deleted
                    this.setState({ images: images })
                })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    return <Login users={this.state.users}
                        onLogin={this.onLogin}{...props} />
                }} />
                <Route exact path="/register" render={props => {
                    return <Register users={this.state.users}
                        registerUser={this.registerUser} onLogin={this.onLogin} {...props} />

                }}
                />
                <Route exact path="/home" render={props => {
                    if (this.isAuthenticated()) {
                        return <FriendsList />
                    } else {
                        return <Redirect to="/" />
                    }

                }} />
                <Route path="/profile" render={props => {
                    if (this.isAuthenticated()) {
                        return <Profile {...props}
                            images={this.state.images}
                            categories={this.state.categories}
                            saveDrawing={this.saveDrawing}
                            saveDrawing2={this.saveDrawing2}
                            deleteDrawing={this.deleteDrawing} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route path="/friends" render={props => {
                    if (this.isAuthenticated()) {
                        return <FriendsList />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
            </React.Fragment>
        )
    }
}