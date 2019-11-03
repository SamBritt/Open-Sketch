import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import '../profile/profile.css'
import { CSSTransition } from "react-transition-group"
import { Spring, Trail, config, useSpring, useTransition, animated } from 'react-spring/renderprops'
import '../../../node_modules/d3-ease'
import { easePoly, easeCubic } from '../../../node_modules/d3-ease';
import { thisExpression } from '@babel/types';
import ImageModal from '../image/ImageModel';
import { Transition } from 'react-pose';
import { Grid, Slug, Fade } from 'mauerwerk'
import Cell from '../image/Cell'


export default class CurrentUserProfile extends Component {

    state = {
        isOpen: false,
        imageClicked: "",
        columns: 3
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
    setColumns = e => this.setState({ columns: parseInt(e.key) })
    render() {
        return (
            <React.Fragment>

                <div className="profileWrapper">
                    <h1 className="title is-1">{sessionStorage.getItem("userName")}</h1>
                    <button className="center-it button is-rounded is-primary" onClick={() => this.props.history.push("/sketch/new")}>Create New Sketch</button>
                </div>

                <div className="wrapper">
                    <Grid className="grid"
                        data={this.props.images}
                        keys={e => e.id}
                        columns={this.state.columns}
                        heights={400}
                        margin = {10}
                        closeDelay={400}>
                        {(data, maximized, toggle) => (
                            <Cell {...data}
                                width = {(props) => props.width}
                                setColumns={this.setColumns}
                                history={this.props.history}
                                handleDelete={this.handleDelete}
                                maximized={maximized}
                                toggle={toggle} />
                        )}

                    </Grid>
                </div>
            </React.Fragment >
        )
    }
}