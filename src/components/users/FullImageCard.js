import React from 'react'

const fullCard = (props) => {

    return (
        <div key={props.id} className="card">
            <div className="fullCard card-image">
                <figure className="image is-square">
                    <img src={props.imageUrl}></img>
                </figure>
            </div>
        </div>
    )
}
export default fullCard