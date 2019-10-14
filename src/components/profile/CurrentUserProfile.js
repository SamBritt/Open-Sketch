import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import '../profile/profile.css'
import { CSSTransition } from "react-transition-group"
import { Spring, Trail, config, useSpring, useTransition, animated } from 'react-spring/renderprops'
import '../../../node_modules/d3-ease'
import { easePoly, easeCubic } from '../../../node_modules/d3-ease';
import { thisExpression } from '@babel/types';
import ImageModal from '../image/ImageModel';




export default class CurrentUserProfile extends Component {

    state = {
        isOpen: false,
        imageClicked: ""
    }

    handleDelete = (event) => {
        event.preventDefault();
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
    toggleModal = (e) => {
        console.log(e.target)
        this.setState({
            imageClicked: e.target.src,
            isOpen: !this.state.isOpen
        })
        console.log(this.state.isOpen)
    }

    render() {
        let menuVis = this.state.isOpen ? 'is-active' : 'is-disabled'
        const modalIds = [];

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
                        to={{ opacity: 1, marginTop: 0 }}>
                        {item => props =>

                            <div style={props} key={item.id} className="card">
                                <div className="card-image">
                                    <figure className="image is-square">
                                        <img src={item.imageUrl} alt={item.name} onClick={this.toggleModal} />
                                    </figure>

                                </div>
                                <div className="card-content">
                                    <div className="media-content">
                                        <p className="title is-3">{item.name}</p>
                                        <p className="subtitle is-6">{item.lessonsLearned}</p>
                                    </div>

                                    <button className="button is-rounded is-primary" onClick={() => this.props.history.push(`/profile/${item.id}/edit`)}>Edit</button>
                                    <button className="button is-rounded is-danger" id={item.id} onClick={this.handleDelete}>Delete</button>
                                    <button className="button is-rounded is-warning" id={item.id} value="button" onClick={this.toggleModal}>Hey</button>
                                </div>


                            </div>

                            
                            
                        }
                        
                        </Trail>
                            {
                                this.state.isOpen ? this.props.images.filter(image => image.imageUrl == this.state.imageClicked ).map(e => 
                                    <ImageModal 
                                    name = {e.name} 
                                    toggleModal = {this.toggleModal} 
                                    menuVis = {menuVis} 
                                    skey = {e.id} 
                                    imageUrl = {e.imageUrl} 
                                    props = {e}/>
                                    ) : null
                            } 
                            {/*
                            <ImageModal menuVis={menuVis} name={item.name} imageUrl={item.imageUrl} toggleModal={this.toggleModal} isOpen={this.state.isOpen} />
                            */}
                        }
                        
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