import React, { Component } from 'react';
import Pressure from 'react-pressure';
import CanvasDraw from "react-canvas-draw";

class MyGreatComponent extends Component {
    state = {
        brushColor: "rgba(0,0,0,.2)",
        width: 800,
        height: 800,
        brushRadius: 5,
        lazyRadius: 5,
        showSaveForm: false,
        saveData: ""
    }
    addBrushSize = () => {
        let force = this.props.force
            let rgb = parseInt(this.state.brushColor)
            let thergb = "rgb(" + 0 + "," + 0 + "," + 0 + "," + force + ")";
            this.state.brushColor = thergb
        

    }
    render() {
        const message = this.props.pressing ? "Stop please" : "Touch me";
        return (
            <div>
                <p onClick={
                    this.addBrushSize()
                }> </p>
                <CanvasDraw addBrushSize={this.addBrushSize}
                    brushRadius={this.state.brushRadius}
                    brushColor={this.state.brushColor} />
                <p>You are using {this.props.force} force</p>
            </div>
        );
    }
}
//This is the important part
export default Pressure(MyGreatComponent);