import React, { Component } from 'react'
import Canvas from '../canvas/Canvas';

export default class Profile extends Component {
    state = {
        showCanvas: false
    }

    revealCanvas = () => {
        this.setState({
            showCanvas: true
        })
    }

    render() {
        return (
            <React.Fragment>
                <button onClick = {this.revealCanvas}>Create New Sketch</button>
                {this.state.showCanvas ? <Canvas /> : null}
            </React.Fragment>
        )
    }
}