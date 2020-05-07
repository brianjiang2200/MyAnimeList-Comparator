import React from 'react';

const Anime = (props) => {

    return (
        <div className="anime">
            <h2 className="anime-title">{props.name}</h2>
            <img src={props.image} alt="" className="anime-img"></img>
        </div>
    );
};

export default Anime;