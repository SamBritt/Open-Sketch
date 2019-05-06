import React, { Component } from 'react'
import Canvas from '../canvas/Canvas';
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

    render() {
        return (
            <React.Fragment>
                {this.props.images.map(image =>
                    <div key = {image.id} className="card">
                        <img src={image.imageUrl} alt="Image"/>
                        <div className="container">
                            <h4>{image.name}</h4>
                            <p>{image.lessonsLearned}</p>
                        </div>
                    </div>
                )}
                <button onClick={this.revealCanvas}>Create New Sketch</button>
                {this.state.showCanvas ? <Canvas ref="canvasRef" categories={this.props.categories}{...this.props} /> : null}
            </React.Fragment>
        )
    }
}