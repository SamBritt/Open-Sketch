import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { storage } from '../config/FireBaseConfig'
import TestFetch from './TestFetch'
import Canvas from './canvas/Canvas'
import FriendsList from './friends/FriendsList';
import Profile from './profile/Profile';
import ApiManager from '../modules/ApiManager'

export default class ApplicationViews extends Component {
    state = {
        users: [],
        friends: [],
        images: [],
        categories: [],
        url: ''

    }
    componentDidMount() {
        const newState = {

        }
        ApiManager.getAll("users")
            .then(users => newState.users = users)
            .then(() => ApiManager.getAll("friends"))
            .then(friends => newState.friends = friends)
            .then(() => ApiManager.getAll("images"))
            .then(images => newState.images = images)
            .then(() => ApiManager.getAll("categories"))
            .then(categories => newState.categories = categories)
            .then(() => this.setState(newState))
    }

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
                this.setState({images: images})
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    return <FriendsList />
                }} />
                <Route path="/profile" render={props => {
                    return <Profile {...props}
                        images={this.state.images}
                        categories={this.state.categories}
                        saveDrawing={this.saveDrawing}
                        saveDrawing2={this.saveDrawing2}
                        deleteDrawing={this.deleteDrawing} />
                }} />
                <Route path="/friends" render={props => {
                    return <FriendsList />
                }} />
            </React.Fragment>
        )
    }
}