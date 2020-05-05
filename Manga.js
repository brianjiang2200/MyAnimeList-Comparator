import React from 'react';

const Manga = (props) => {
    return (
        <div className="manga">
            <h2>{props.name}</h2>
            <img src={props.image} alt=""></img>
        </div>
    );
}

export default Manga;