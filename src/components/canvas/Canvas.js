import React, { Component } from 'react'
import CanvasDraw from "react-canvas-draw";

export default class Canvas extends Component {
    state = {
        color: "#ffc600",
        width: 800,
        height: 800,
        brushRadius: 5,
        lazyRadius: 5

    }

    render() {
        return (
            <React.Fragment>
                <CanvasDraw />
            </React.Fragment>
        )
    }
}


