import React, { Component } from 'react'
import { storage } from '../config/FireBaseConfig'
import TestFetch from './TestFetch'

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
                        this.setState({url})
                    })
                }
            )
        }
        
    }


    render() {
        return (
            <div>
            <input type = "file" onChange = {this.handleUploadFile}/>
            {console.log(storage)}
                <button>Save</button>
                
            </div>
        )
    }
}