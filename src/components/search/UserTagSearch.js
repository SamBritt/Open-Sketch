import React, { Component } from 'react'

export default class UserTagSearch extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                        <input className = "input" type="text" onChange={event =>
                            this.props.onChange(event.target.value)} />
                </div>
            </React.Fragment>
        )
    }
}