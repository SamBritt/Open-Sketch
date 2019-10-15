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
        
        let colorValues = Object.values(color.rgb)
        let colorStr = `rgba(`

        colorValues = colorValues.join(',')
        colorStr += colorValues
        colorStr += `)`
        
        this.setState({ brushColor: colorStr });
        
    };


    render() {
        return (
            <React.Fragment>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <article className="tile is-child notification">
                                    <div className="slider-wrapper">
                                        <label>Brush-Radius:</label>
                                        <input className="slider is-fullwidth"
                                            step="1"
                                            min="1"
                                            max="50"
                                            value={this.state.brushRadius}
                                            type="range"
                                            onChange={e => this.setState({ brushRadius: parseInt(e.target.value, 10) })}
                                            orient="vertical" />

                                        <label>Lazy-Radius:</label>
                                        <input className="slider is-fullwidth"
                                            step="1"
                                            min="1"
                                            max="50"
                                            value={this.state.lazyRadius}
                                            type="range"
                                            onChange={e => this.setState({ lazyRadius: parseInt(e.target.value, 10) })}
                                            orient="vertical" />
                                    </div>
                                </article>
                                <article className="tile is-child notification">
                                    <ChromePicker color={this.state.brushColor}
                                        onChangeComplete={this.handleChange}
                                    />
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child notification">
                                    <CanvasDraw brushRadius={this.state.brushRadius}
                                        brushColor={this.state.brushColor}
                                        lazyRadius={this.state.lazyRadius}
                                        canvasWidth={this.state.canvasWidth}
                                        canvasHeight={this.state.canvasHeight}
                                    />

                                </article>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="buttflex">
                    <button className="center-it button is-rounded is-primary" onClick={this.loadSaveForm}>Complete</button>
                    {this.state.showSaveForm
                        ?
                        <CanvasSaveForm
                            saveDrawing2={this.saveDrawing2}
                            saveDrawing={this.saveDrawing}
                            categories={this.props.categories}
                            addCategory={this.addCategory}
                            {...this.props} />
                        :
                        null}
                </div>
            </React.Fragment>
        )
    }
}


