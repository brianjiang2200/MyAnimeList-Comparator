import React from 'react';
import Anime from './Anime';

const AnimeList = (props) => {
    if (props.list.length) {
        let list = [];
        if (props.list[props.index])
            list.push(props.list[props.index]);
        if (props.list[props.index + 1]) 
            list.push(props.list[props.index + 1]);
        if (props.list[props.index + 2]) 
            list.push(props.list[props.index + 2]);
        if (props.list[props.index + 3]) 
            list.push(props.list[props.index + 3]);
        
        return (
            <div className="anime-list">
                {list.map(anime => (
                    <Anime 
                        name={anime.title}
                        image={anime.image_url} 
                    />
                ))};
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