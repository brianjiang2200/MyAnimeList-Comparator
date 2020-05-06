import React from 'react';

const Anime = (props) => {

    return (
        <div className="anime">
            <h2>{props.name}</h2>
            <img src={props.image} alt=""></img>
        </div>
    );
};

export default Anime;