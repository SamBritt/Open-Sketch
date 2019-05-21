import React, { Component } from 'react'
import './canvasSave.css'
import bulmaTagsInput from 'bulma-extensions/bulma-tagsinput/dist/js/bulma-tagsinput'


export default class CanvasSaveForm extends Component {

    state = {
        name: "",
        lessonsLearned: "",
        categoryId: "",
        imageUrl: "",
        userId: "",
        categoryToAdd: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    handleSaveSketch = (event) => {
        event.preventDefault();

        this.props.saveDrawing(this.state.name, this.state.lessonsLearned, this.state.categoryId, this.state.userId)
        this.props.history.push(`/profile/${sessionStorage.getItem("userName")}`)

    }
    handleAddCategory = (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            if (event.target.value !== "") {
                const category = {
                    categoryName: event.target.value
                }

                this.props.addCategory(category)
            }
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <form className="saveForm">
                        <div className="field">
                            <label className="label" htmlFor="nameInput">Sketch Name: </label>
                            <div className="control">
                                <input className="input" type="text"
                                    placeholder="Name your sketch..."
                                    id="name"
                                    required
                                    onChange={this.handleFieldChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="lessonsInput">Lessions: </label>
                            <div className="control">
                                <input className="input" type="text"
                                    placeholder="Learn anything new?..."
                                    id="lessonsLearned"
                                    required
                                    onChange={this.handleFieldChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="categoryInput">Categories: </label>
                            <div className="control">
                                <input className="input"
                                    placeholder="Tag: "
                                    onKeyUp={this.handleAddCategory}
                                    type="text"
                                    id="categorToAdd"
                                />
                                {

                                }
                            </div>

                        </div>
                        <div className="field">
                            <label className="label" htmlFor="categoryInput">Category: </label>
                            <div className="control">
                                <div className="select is-rounded">
                                    <select
                                        defaultValue=""
                                        name="category"
                                        id="categoryId"
                                        onChange={this.handleFieldChange}>
                                        <option value="" disabled>Select a Category</option>
                                        {this.props.categories.map(e => (
                                            <option key={e.id} id={e.id} value={e.id}>
                                                {e.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button className="button is-rounded is-primary" type="button" onClick={this.handleSaveSketch}>Save Sketch</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}