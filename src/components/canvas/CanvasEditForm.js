import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'

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
                <div>
                    <form>
                        <label htmlFor="nameInput">Name: </label>
                        <input
                            id="name"
                            value={this.state.name}
                            onChange={this.handleFieldChange}
                        />
                        <label htmlFor="lessonsInput">Lessons Learned: </label>
                        <input
                            id="lessonsLearned"
                            value={this.state.lessonsLearned}
                            onChange={this.handleFieldChange}
                        />
                        <label htmlFor="categoryInput">Category: </label>
                        <select
                            value= {this.state.categoryId}
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
                        <button className = "button is-primary" onClick = {this.handleUpdate}>Update Event</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}