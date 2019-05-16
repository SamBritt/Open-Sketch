import React from 'react'

const imageCard = (props) => {

    return (
        <div key={props.id} className="card card-flip">
            <div className="card-image">
                <figure className="image is-square">
                    <img src={props.imageUrl}></img>
                </figure>
            </div>
            <div className="card-content">
                <div className="media-content">
                    <p className="title is-3">{props.name}</p>
                </div>
                <div className="content">
                {props.lessonsLearned}
                </div>
            </div>
        </div>
    )
}
export default imageCard