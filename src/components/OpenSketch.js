import React, { Component } from 'react'
import Nav from './nav/Nav'
import ApplicationViews from './ApplicationViews'
import './openSketch.css'



class OpenSketch extends Component {
    render() {
        return (
            <React.Fragment>
                
                    <Nav />
                    <ApplicationViews />
              
            </React.Fragment>
        )
    }
}
export default OpenSketch;