import React from 'react'

const imageCard = (props) => {

    return (
        <div key = {props.id} className="card">
            <img src={props.imageUrl}></img>
        </div>
    )
}
export default imageCard