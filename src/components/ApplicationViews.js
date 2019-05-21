import React, { Component } from 'react'
import { Route, Redirect, Switch } from "react-router-dom"
import { storage } from '../config/FireBaseConfig'
import Canvas from './canvas/Canvas'
import ApiManager from '../modules/ApiManager'
import Login from './login/Login'
import Register from './login/Register'
import CanvasEditForm from './canvas/CanvasEditForm';
import FriendsList from './friends/FriendsList';
import UserImageList from './users/UserImageList'
import Profile from './profile/Profile';
import 'bulma/css/bulma.css'

export default class ApplicationViews extends Component {
    state = {
        users: [],
        friends: [],
        images: [],
        categories: [],
        userId: "",
        friendsImages: [],
        usersImages: [],
        currentUserName: ""
    }
    componentDidMount() {
        let currentUserId = sessionStorage.getItem("userID")
        let currentUserName = sessionStorage.getItem("userName")
        this.loadAllData(currentUserId)
    }

    loadAllData = (currentUserId) => {

        const newState = {

        }

        ApiManager.getAllUsers()
            .then(users => newState.users = users)
            .then(() => sessionStorage.getItem("userName"))

            .then(userName => newState.currentUserName = userName)
            .then(() => ApiManager.getAll("friends", currentUserId))
            .then(friends => newState.friends = friends)
            .then(() => ApiManager.getFriendsUserId(currentUserId))
            .then(friends => newState.friends = friends)
            .then(() => ApiManager.getFriendsUserId(currentUserId))
            .then(r => r.map(e => e.user.id))
            .then(r => r.map(e => ApiManager.getFriendsImage(e)))
            .then(r => Promise.all(r))
            .then(r => {
                newState.friendsImages = r
            })
            .then(() => ApiManager.getAll("images", currentUserId))
            .then(images => newState.images = images)
            .then(() => ApiManager.getAllUsersImages())
            .then(usersImages => newState.usersImages = usersImages)
            .then(() => ApiManager.getAll("categories", currentUserId))
            .then(categories => newState.categories = categories)
            .then(() => this.setState(newState))
    }

    onLogin = () => {
        this.setState({
            userId: sessionStorage.getItem("userID"),
            userName: sessionStorage.getItem("userName")
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
    addFriend = (user) => {
        if (!user) {
            window.alert("It seems like that user does not exist!")
        } else if (user.id === Number(sessionStorage.getItem("userID"))) {
            window.alert("You can't add yourself as a friend!")
        } else if (this.state.friends.find(friendToFind => friendToFind.user.userName.toLowerCase() === user.userName.toLowerCase())) {
            window.alert("You are already friends with this user!")
        } else if (user) {
            if (window.confirm(`Add ${user.userName} as a friend?`)) {

                const newFriend = {
                    userId: user.id,
                    currentUserId: Number(sessionStorage.getItem("userID"))
                }
                ApiManager.postEntry(newFriend, "friends")
                    .then(() => this.loadAllData(sessionStorage.getItem("userID")))
            } else {
                window.alert("Username not found")
            }
        }
    }

    removeFriend = (id) => {
        ApiManager.deleteEntry("friends", id)
            .then(() => this.loadAllData(sessionStorage.getItem("userID")))
    }

    isAuthenticated = () => sessionStorage.getItem("userID") !== null

    OtherUsers = () => {
        let currentUser = sessionStorage.getItem("userName")
        let notCurrent = this.state.users.filter(otherUser => otherUser.userName !== currentUser)
        return notCurrent
    }

    saveDrawing = (name, lessonsLearned, categoryId, userId) => {
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
                            userId: Number(sessionStorage.getItem("userID")),
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
        const newObj = {

        }

        return ApiManager.postEntry(newDrawing, "images")
            .then(() => ApiManager.getAll("images", sessionStorage.getItem("userID")))
            .then(images => {
                // this.setState({
                //     images: images
                // })
                newObj.images = images
            })
            .then(() => ApiManager.getAllUsersImages())
            .then(response => newObj.usersImages = response)
            .then(() => this.setState(newObj))
    }

    deleteDrawing = (imgUrl, id) => {
        //Gets JSON image URL and id passed from mapping over list of images in Profile.js
        const imageRef = storage.refFromURL(imgUrl)
        const newObj = {

        }
        //Deletes Firebase file in Storage
        imageRef.delete().then(() => {
            //Then deletes JSON Object containing that URL.
            return ApiManager.deleteEntry("images", id)
                .then(() => ApiManager.getAll("images", sessionStorage.getItem("userID")))
                .then(images => {
                    console.log(images)
                    //Updates state with images minus the one deleted
                    newObj.images = images
                    // this.setState({ images: images })
                })
                .then(() => ApiManager.getAllUsersImages())
                .then(response => newObj.usersImages = response)
                .then(() => this.setState(newObj))
        }).catch((error) => {
            console.log(error)
        })
    }
    updateDrawing = (imageToUpdate) => {
        return ApiManager.updateEntry(imageToUpdate, "images")
            .then(() => ApiManager.getAll("images", sessionStorage.getItem("userID")))
            .then(images => {
                this.setState({
                    images: images
                })
            })
    }

    addCategory = (newCategory) => {


        console.log(newCategory)

        return ApiManager.postEntry(newCategory, "categories")
            .then(() => ApiManager.getAll("categories", sessionStorage.getItem("userID")))
            .then(categories => {
                this.setState({
                    categories: categories
                })
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


                <Route exact path="/profile/:userName" render={props => {
                    if (this.isAuthenticated()) {
                        return <Profile images={this.state.images}
                            usersImages={this.state.usersImages}
                            users={this.state.users}
                            categories={this.state.categories}
                            saveDrawing={this.saveDrawing}
                            saveDrawing2={this.saveDrawing2}
                            deleteDrawing={this.deleteDrawing}
                            addFriend={this.addFriend} {...props} />
                    }
                    else {
                        return <Redirect to="/" />
                    }
                }
                } />

                <Route path="/home" render={props => {
                    if (this.isAuthenticated()) {
                        return <UserImageList usersImages={this.state.usersImages} />
                    } else {
                        return <Redirect to="/" />
                    }

                }}
                />

                <Route exact path="/sketch/new" render={props => {
                    return <Canvas images={this.state.images}
                        categories={this.state.categories}
                        addCategory={this.addCategory}
                        saveDrawing={this.saveDrawing}
                        saveDrawing2={this.saveDrawing2}
                        deleteDrawing={this.deleteDrawing}{...props} />
                }} />
                <Route exact path="/profile/:imageId(\d+)/edit" render={props => {
                    return <CanvasEditForm {...props} updateDrawing={this.updateDrawing}
                        categories={this.state.categories}
                    />
                }
                }
                />

                <Route path="/friends" render={props => {
                    if (this.isAuthenticated()) {
                        return <FriendsList friends={this.state.friends}
                            addFriend={this.addFriend}
                            removeFriend={this.removeFriend} />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
            </React.Fragment >
        )
    }
}