import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import './canvasEdit.css'

export default class CanvasEditForm extends Component {

    state = {
        userId: "",
        categoryId: "",
        name: "",
        lessonsLearned: ""
    }
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    handleUpdate = (event) => {
        event.preventDefault();

        let updatedImage = {
            userId: Number(sessionStorage.getItem("userID")),
            categoryId: Number(this.state.categoryId),
            name: this.state.name,
            lessonsLearned: this.state.lessonsLearned,
            id: Number(this.props.match.params.imageId)
        }
        this.props.updateDrawing(updatedImage)
            .then(() => this.props.history.push(`/profile/${sessionStorage.getItem("userName")}`))
    }
    componentDidMount() {
        ApiManager.getOne("images", this.props.match.params.imageId)
            .then(image => {
                this.setState({
                    userId: image.userId,
                    categoryId: Number(image.categoryId),
                    name: image.name,
                    lessonsLearned: image.lessonsLearned
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="field">
                        <form>
                            <label className="label" htmlFor="nameInput">Name: </label>
                            <div className="control">
                                <input className="input"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.handleFieldChange}
                                />
                            </div>
                            <div className="field">
                                <label className="label" htmlFor="lessonsInput">Lessons Learned: </label>
                                <div className="control">
                                    <input className="input"
                                        id="lessonsLearned"
                                        value={this.state.lessonsLearned}
                                        onChange={this.handleFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" htmlFor="categoryInput">Category: </label>
                                <div className="control">
                                    <select
                                        value={this.state.categoryId}
                                        name="category"
                                        id="categoryId"
                                        onChange={this.handleFieldChange}>
                                        <option value="" >Select a Category</option>
                                        {this.props.categories.map(e => (
                                            <option key={e.id} id={e.id} value={e.id}>
                                                {e.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="control">
                                <button className="button is-primary" onClick={this.handleUpdate}>Update Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}