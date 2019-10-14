import React from 'react';

const ImageModal = (props) => {
    // state = {
    //     image: []
    // }

    // imageToGet = (e) => {
    //     let image = e.target.src
    //     return image;
    // }
    // toggleThis() {
    //     this.props.toggleModal();
    //     this.setState({
    //         image: this.props.imageClicked
    //     })
    // }

    // render() {
    //     const imageProps = this.props.item;
    //     let menuVis = this.props.isOpen ? 'is-active' : 'is-disabled'
    //     console.log(imageProps);
    //     console.log(this.props);

    return (
        <div key={props.id} id="modalExpand" className={`modal ${props.menuVis} is-clipped`}>
            <div className="modal-background" onClick={props.toggleModal}></div>
            <div className="modal-content">
                <div class="modal-card">
                    <section class="modal-card-body">
                        <figure className="image is-4by4">
                            <img src={props.imageUrl} alt={props.name}></img>
                        </figure>
                    </section>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={props.toggleModal}></button>
            </div>

        </div>
    )
}

// }
export default ImageModal;