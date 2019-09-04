import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import '../profile/profile.css'
import { CSSTransition } from "react-transition-group"
import { Spring, Trail, config, useSpring, useTransition, animated } from 'react-spring/renderprops'
import '../../../node_modules/d3-ease'
import { easePoly, easeCubic } from '../../../node_modules/d3-ease';




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
    fadeIn = () => {
        const fade = useSpring({
            from: {
                opacity: 0
            },
            to: {
                opacity: 1,

            }
        })
        return fade;
    }
    render() {
        return (
            <React.Fragment>
                <div className="profileWrapper">
                    <h1 className="title is-1">{sessionStorage.getItem("userName")}</h1>
                    <button className="center-it button is-rounded is-primary" onClick={() => this.props.history.push("/sketch/new")}>Create New Sketch</button>
                </div>
                <div className="wrapper">
                    {/* New Addition */}

                    {/* End New Addition */}



                    <Trail items={this.props.images} keys={item => item.id}
                        config={{ easing: easeCubic, duration: 1200 }}
                        from={{ opacity: 0, marginTop: 5 }}
                        to={{ opacity: 1, marginTop: 0}}>
                        {item => props =>

                               <div style={props} key={item.id} className="card">
                                    <div className="card-image">
                                        <figure className="image is-square">
                                            <img src={item.imageUrl} alt="Image" />
                                        </figure>

                                    </div>
                                    <div className="card-content">
                                        <div className="media-content">
                                            <p className="title is-3">{item.name}</p>
                                            <p className="subtitle is-6">{item.lessonsLearned}</p>
                                        </div>

                                        <button className="button is-rounded is-primary" onClick={() => this.props.history.push(`/profile/${item.id}/edit`)}>Edit</button>
                                        <button className="button is-rounded is-danger" id={item.id} onClick={this.handleDelete}>Delete</button>
                                    </div>
                                </div>

                            }
                    </Trail>
                    {/* {this.props.images.map(image =>

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


                        )} */}
                </div>

            </React.Fragment >
        )
    }
}