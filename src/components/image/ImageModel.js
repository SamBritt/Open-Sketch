import React from 'react';

const ImageModal = (props) => {
    return (
        <div key={props.id} id="modalExpand" className={`modal ${props.menuVis}`}>
            <div className="modal-background" onClick={props.toggleModal}></div>
            <div className="modal-content">
                        <figure className="image is-4by4 is-clipped">
                            <img src={props.imageUrl} alt={props.name}></img>
                        </figure>
                <button className="modal-close is-large" aria-label="close" onClick={props.toggleModal}></button>
            </div>

        </div>
    )
}

// }
export default ImageModal;