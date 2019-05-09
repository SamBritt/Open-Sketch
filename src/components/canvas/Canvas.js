import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw";
import CanvasSaveForm from './CanvasSaveForm'
import './canvas.css'

export default class Canvas extends Component {
    state = {
        color: "#ffc600",
        canvasWidth: 500,
        canvasHeight: 500,
        brushRadius: 5,
        lazyRadius: 5,
        showSaveForm: false,
        saveData: ""
    }

    loadSaveForm = () => {
        this.setState({
            showSaveForm: true
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div>
                        <label>Brush-Radius:</label>
                        <input
                            type="number"
                            value={this.state.brushRadius}
                            onChange={e =>
                                this.setState({ brushRadius: parseInt(e.target.value, 10) })
                            }
                        />
                    </div>
                    <div>
                        <label>Lazy-Radius:</label>
                        <input
                            type="number"
                            value={this.state.lazyRadius}
                            onChange={e =>
                                this.setState({ lazyRadius: parseInt(e.target.value, 10) })
                            }
                        />
                    </div>
                        <CanvasDraw brushRadius={this.state.brushRadius}
                            lazyRadius={this.state.lazyRadius}
                            canvasWidth={this.state.canvasWidth}
                            canvasHeight={this.state.canvasHeight} />
                    <button onClick={this.loadSaveForm}>Complete</button>
                    {this.state.showSaveForm ? <CanvasSaveForm saveDrawing2={this.saveDrawing2} saveDrawing={this.saveDrawing} categories={this.props.categories}{...this.props} /> : null}
                </div>
            </React.Fragment>
        )
    }
}


