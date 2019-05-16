import React, { Component } from 'react'

import ApiManager from '../../modules/ApiManager'
import '../profile/profile.css'



export default class CurrentUserProfile extends Component {

    handleDelete = (event) => {
        event.preventDefault();
        console.log(event.target)
        ApiManager.getOne("images", event.target.id)
            .then(image => {
                let urlToDelete = image.imageUrl
                let imageId = image.id
                this.props.deleteDrawing(urlToDelete, imageId)
            })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <button className="button is-rounded is-primary" onClick={() => this.props.history.push("/sketch/new")}>Create New Sketch</button>
                </div>
                <div className="wrapper">
                    {this.props.images.map(image =>
                        <div key={image.id} className="card">
                            <div className="card-image">
                                <figure className="image is-square">
                                    <img src={image.imageUrl} alt="Image" />
                                </figure>

                            </div>
                            <div className="card-content">
                                <div className="media-content">
                                    <p className="title is-3">{image.name}</p>
                                    <p className="subtitle is-6">{image.lessonsLearned}</p>
                                </div>

                                <button className="button is-rounded is-primary" onClick={() => this.props.history.push(`/profile/${image.id}/edit`)}>Edit</button>
                                <button className="button is-rounded is-danger" id={image.id} onClick={this.handleDelete}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>

            </React.Fragment>
        )
    }
}