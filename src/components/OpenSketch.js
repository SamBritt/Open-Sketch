import React, { Component } from 'react'
import Nav from './nav/Nav'
import ApplicationViews from './ApplicationViews'
import './openSketch.css'



class OpenSketch extends Component {
    state = {
        currentUser: sessionStorage.getItem("userName")
    }
    refreshUser = () => {
        let currentUser = sessionStorage.getItem("userName");
        this.setState({currentUser: currentUser})
    }
    render() {
        return (
            <React.Fragment>
                
                    <Nav currentUser = {this.state.currentUser}
                    />
                    <ApplicationViews refreshUser = {this.refreshUser}/>
              
            </React.Fragment>
        )
    }
}
export default OpenSketch;