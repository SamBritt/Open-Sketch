import React, {Component} from 'react'

export default class TestFetch extends Component{
    getCategories = () => {
        fetch("https://open-sketch.appspot.com/images?auth=UJ53qL6uKqiBgq9EWkvm9r4wPNrW4veNXYKW9OPe")
        .then(e => e.json())
        .then(r => console.log(r))
    }

    render(){
        return(
            <div>
            {this.getCategories()}
            </div>
        )
    }
}