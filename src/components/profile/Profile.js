import React, { Component } from 'react'
import Canvas from '../canvas/Canvas';
import ApiManager from '../../modules/ApiManager'
import '../profile/profile.css'

export default class Profile extends Component {
    state = {
        showCanvas: false
    }

    revealCanvas = () => {
        this.setState({
            showCanvas: true
        })
    }
    handleDelete = (event) => {
        event.preventDefault();
        console.log(event.target)
        ApiManager.getOne("images", event.target.id)
            .then(image => {
                let urlToDelete = image.imageUrl
                let imageId = image.id
                this.props.deleteDrawing(urlToDelete, imageId)
            })
        //Get URL and id stored in JSON, pass to deleteDrawing() function
        // let urlToDelete = event.target.imageUrl
        // let imageId = event.target.id
        // console.log(urlToDelete)
        // console.log(imageId)
        // this.props.deleteDrawing(urlToDelete, imageId)

    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.revealCanvas}>Create New Sketch</button>
                </div>
                <div className="wrapper">
                    {this.props.images.map(image =>
                        <div key={image.id} className="card">
                            <img src={image.imageUrl} alt="Image" />
                            <div className="container">
                                <h4>{image.name}</h4>
                                <p>{image.lessonsLearned}</p>
                                <button onClick={() => this.props.history.push(`/profile/${image.id}/edit`)}>Edit</button>
                                <button id={image.id} onClick={this.handleDelete}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
                {this.state.showCanvas ? <Canvas ref="canvasRef" categories={this.props.categories}{...this.props} /> : null}
            </React.Fragment>
        )
    }
}