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
                <label>Width:</label>
                <input
                    type="number"
                    value={this.state.width}
                    onChange={e => {
                        console.log(e.target.value)
                        this.setState({ width: parseInt(e.target.value, 10) })
                    }
                    }
                />
                <CanvasDraw canvasWidth={this.state.width} />
            </React.Fragment>
        )
    }
}


