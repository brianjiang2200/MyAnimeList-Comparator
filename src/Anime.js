import React from 'react';

const Anime = (props) => {

    /*<div className="anime-scores">
        {props.scores.map(score => (
            <h3>{score}</h3>  
        ))}
    </div>*/

    return (
        <div className="anime soft-borders">
            <a href={props.url} className="anime-url">
                <h2 className="anime-title">{props.name}</h2>
                <img src={props.image} alt="" className="anime-img soft-borders"></img>
            </a>
        </div>
    );
};

export default Anime;