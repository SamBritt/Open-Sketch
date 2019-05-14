import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import UserImageCard from '../users/UserImageCard'


export default class UserTagSearch extends Component {
    render() {
        return (
            <React.Fragment>
                <div >
                    <img />
                    <input type="text" onChange={event =>
                        this.props.onChange(event.target.value)} />
                </div>
            </React.Fragment>
        )
    }
}