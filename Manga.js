import React from 'react';

const Manga = (props) => {
    return (
        <div className="manga">
            <h2 className="manga-title">{props.name}</h2>
            <img src={props.image} alt="" className="manga-img"></img>
        </div>
    );
}

export default Manga;