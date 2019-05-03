import React, { Component } from 'react'

export default class CanvasSaveForm extends Component {

    state = {
        name: "",
        lessonsLearned: "",
        categoryId: "",
        imageUrl: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    handleSaveSketch = (event) => {
        event.preventDefault();

        this.props.saveDrawing(this.state.name, this.state.lessonsLearned, this.state.categoryId)
    }


    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <form>
                    <label htmlFor="nameInput">Sketch Name: </label>
                    <input type="text"
                        id="name"
                        required
                        onChange={this.handleFieldChange} />
                    <label htmlFor="lessonsInput">Lessons Learned: </label>
                    <input type="text"
                        id="lessonsLearned"
                        required
                        onChange={this.handleFieldChange} />
                    <label htmlFor="categoryInput">Category: </label>
                    <select
                        defaultValue=""
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
                    <button type="button" onClick={this.handleSaveSketch}>Save Sketch</button>
                </form>
            </React.Fragment>
        )
    }
}