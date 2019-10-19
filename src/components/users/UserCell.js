import React from 'react'
import { Grid, Slug, Fade } from 'mauerwerk'

const UserCell = ({ toggle, name, height, maximized, imageUrl, id, history }) => (
    <a href={`#${id}`}>
        <div
            className="cell"
            style={{ backgroundImage: `url(${imageUrl})`, cursor: !maximized ? 'pointer' : 'auto', aspectRatio: 16 / 9 }}
            onClick={!maximized ? toggle : undefined}>
            <Fade style={{ height: 1000 }} show={maximized} delay={maximized ? 400 : 0}>
                <div name = {id} className="details">
                    <Slug delay={600}>

                        <img id={id} style={{ aspectRatio: 16 / 9 }} className="imageStyle" src={imageUrl} alt={name}></img>
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
    </a>
)
export default UserCell;