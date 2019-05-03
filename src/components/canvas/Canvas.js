import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw";
import CanvasSaveForm from './CanvasSaveForm'

export default class Canvas extends Component {
    state = {
        color: "#ffc600",
        width: 800,
        height: 800,
        brushRadius: 5,
        lazyRadius: 5,
        showSaveForm : false,
        saveData: ""
    }

    handleSaveSketch = () => {
        console.log("save sketch clicked")
        
    }
    loadSaveForm = () => {
        this.setState({
            showSaveForm : true
        })
    }

    render() {
        return (
            <React.Fragment>
                <CanvasDraw/>
                <button onClick = {this.loadSaveForm}>Complete</button>
                {this.state.showSaveForm ? <CanvasSaveForm saveDrawing2 = {this.saveDrawing2} saveDrawing = {this.saveDrawing} categories = {this.props.categories}{...this.props}/> : null}
            </React.Fragment>
        )
    }
}


