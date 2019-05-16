import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import UserTagSearch from '../search/UserTagSearch'
import UserImageCard from '../users/UserImageCard'
import './otherUserProfile.css'


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
    render() {
        console.log(this.state.searchString)

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
                    <div className="column is-half
                    is-offset-one-quarter">
                        {

                            <UserTagSearch onChange={text => {
                                this.setState({ searchString: text })
                            }} />
                        }
                    </div>
                    {
                        this.props.usersImages.filter(user =>
                            this.props.match.params.userName === user.userName
                        )
                            .map(foundUser =>
                                <div key={foundUser.id}>

                                    <div className = "userNameWrapper">

                                        <h1 className="title is-1">{foundUser.userName}</h1>

                                        <button className="button is-rounded is-primary"
                                            onClick={this.handleAddFriend}>
                                            Add
                                        </button>
                                        </div>
                                    
                                    <div className="container">
                                        {

                                            this.state.searchString !== "" ?
                                                imagesToRender.map(image => {
                                                    return image.map(e => {

                                                        console.log(e.name)
                                                        console.log("true")
                                                        return <UserImageCard key={e.id} name={e.name} lessonsLearned={e.lessonsLearned} imageUrl={e.imageUrl} />
                                                    })
                                                }
                                                ) :
                                                foundUser.images.map(foundUserImage => {

                                                    return <UserImageCard key={foundUserImage.id} name={foundUserImage.name} lesssonsLearned={foundUserImage.lessonsLearned} imageUrl={foundUserImage.imageUrl} />
                                                }
                                                )
                                        }
                                    </div>
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

            </React.Fragment >
        )
    }
}