import React from 'react';
import Anime from './Anime';

const AnimeList = (props) => {
    if (props.list.length > 0) {
        return (
            <div className="anime-list">
                <Anime name={props.list[props.index].title} />
                <Anime name={props.list[props.index + 1].title} />
                <Anime name={props.list[props.index + 2].title} />
                <Anime name={props.list[props.index + 3].title} />
            </div>
        );
    } else {
        return (
            <div className="anime-list">

            </div>
        );
    }
};

export default AnimeList;