import React from 'react'
import { Grid, Slug, Fade } from 'mauerwerk'

const Cell = ({ width, toggle, name, height, maximized, handleDelete, imageUrl, id, history, setColumns, columns}) => (
    <div
        className="cell"
        style={{backgroundImage: `url(${imageUrl})`, cursor: !maximized ? 'pointer' : 'auto'}}
        onClick={!maximized ? toggle : undefined}>
        <Fade show={maximized} delay={maximized ? 400 : 0}>
            <div className="details">
                <Slug delay={600}>

                    <img className="imageStyle" src={imageUrl} alt={name}></img>
                    <button className="button is-rounded is-primary" onClick={() => history.push(`/profile/${id}/edit`)}>Edit</button>
                    <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar"></a>
                    <button className="button is-rounded is-danger" id={id} onClick={handleDelete}>Delete</button>
                    <h1>{name}</h1>
                </Slug>
            </div>
        </Fade>
        <Fade
            show={!maximized}
            from={{ opacity: 0, transform: 'translate3d(0, 140px, 0)' }}
            enter={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
            leave={{ opacity: 0, transform: 'translate3d(0, -50px, 0)' }}
            delay={maximized ? 0 : 400}>
            <div className="default">{name}</div>

        </Fade>
    </div>
)
export default Cell;