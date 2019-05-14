import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import UserTagSearch from '../search/UserTagSearch'
import UserImageCard from '../users/UserImageCard'

export default class UserProfile extends Component {
    state = {
        searchString: "",
        results: [],
        showResults: false
    }
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }

    handleAddFriend = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        ApiManager.getAllUsers()
            .then(users => users.find(user => user.userName.toLowerCase() === this.props.match.params.userName.toLowerCase()))
            .then(matchedUser => this.props.addFriend(matchedUser))
    }
    handleSearch = (event) => {
        event.preventDefault();

        ApiManager.getAllUsersImages()
            .then(user => user.find(profileUser =>
                this.props.match.params.userName === profileUser.userName
            ))
            .then(user => user.images.filter(image => {
                return image.name === this.state.searchString
            }))
            .then(filteredUsers => this.setState({
                results: filteredUsers
            }))
            .then(() => this.handleShowResults())
            .then(() => this.setState({ searchString: "" }))
    }
    handleShowResults = () => {

        if (!this.state.showResults) {
            this.setState(prevState => ({ showResults: prevState.showResults }))
        }
    }

    render() {
        console.log( this.state.searchString)

        let imagesToRender = this.props.users ?
            this.props.usersImages.filter(user =>
                this.props.match.params.userName === user.userName
            ).map(user => user.images.filter(image =>
                image.name.toLowerCase().includes(
                    this.state.searchString.toLowerCase()
                )
            )) : []

            console.log(imagesToRender)
        return (
            <React.Fragment>
                <div>
                    {/*<span className="mr-1">
                        <label htmlFor="userTagSearch" >Tags: </label>
                        <input type="text"
                            id="searchString"
                            onChange={this.handleFieldChange}
                            value={this.state.searchString}
                            required
                            placeholder="Faces, Torsos, etc ..." />
                        <button onClick={this.handleSearch}></button>

        </span>*/
                        <UserTagSearch onChange={text => {
                            this.setState({searchString: text})
                          }}/>
                    }
                    {
                        this.props.usersImages.filter(user =>
                            this.props.match.params.userName === user.userName
                        )
                            .map(foundUser =>
                                <div key={foundUser.id}>
                                    <span>
                                        <h1>{foundUser.userName}</h1>
                                        <button
                                            onClick={this.handleAddFriend}>
                                            Add Friend
                                        </button>
                                    </span>
                                    {
                                        this.state.searchString !== "" ?
                                            imagesToRender.map(image => {
                                                image.map(e => {
                                                    
                                                    console.log(e)
                                                    console.log("true")
                                                    return <UserImageCard  key={e.id} imageUrl={e.imageUrl} />
                                                    // return (
                                                    //     <div id = {e.id}>
                                                    //     <p>asdad</p>
                                                    //         <img src = {e.imageUrl}/>
                                                    //     </div>
                                                    // )
                                                })
                                            }
                                            ) :
                                            foundUser.images.map(foundUserImage => {
                                            
                                                return <UserImageCard key={foundUserImage.id} imageUrl={foundUserImage.imageUrl} />
                                            }
                                            )
                                    }
                                    <div>

                                    </div>
                                </div>
                            )
                    }
                    {
                    }
                    <div>

                    </div>
                </div>

            </React.Fragment>
        )
    }
}