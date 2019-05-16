import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw";
import CanvasSaveForm from './CanvasSaveForm'
import { ChromePicker } from 'react-color';
import './canvas.css'

export default class Canvas extends Component {
    state = {
        brushColor: "rgb(0, 0, 0, 1)",
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

    handleChange = (color) => {
        console.log(color.rgb)
        let colorValues = Object.values(color.rgb)
        let colorStr = `rgba(`
        
        colorValues = colorValues.join(',')
        colorStr += colorValues
        colorStr += `)`
        console.log(colorStr)
        this.setState({ brushColor: colorStr });
        console.log(this.state.brushColor)
    };


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
                    <ChromePicker color={this.state.brushColor}
                        onChangeComplete={this.handleChange}
                    />

                    <CanvasDraw brushRadius={this.state.brushRadius}
                        brushColor={this.state.brushColor}
                        lazyRadius={this.state.lazyRadius}
                        canvasWidth={this.state.canvasWidth}
                        canvasHeight={this.state.canvasHeight}
                    />
                    <button className="button is-rounded is-primary" onClick={this.loadSaveForm}>Complete</button>
                    {this.state.showSaveForm ? <CanvasSaveForm saveDrawing2={this.saveDrawing2} saveDrawing={this.saveDrawing} categories={this.props.categories}{...this.props} /> : null}
                </div>
            </React.Fragment>
        )
    }
}


