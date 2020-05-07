import React from 'react';
import Anime from './Anime';

const AnimeList = ({list, index}) => {

    let newList = [];
    if (list[index]) 
        newList.push(list[index]);
    if (list[index + 1]) 
        newList.push(list[index + 1]);
    if (list[index + 2]) 
        newList.push(list[index + 2]);
    if (list[index + 3]) 
        newList.push(list[index + 3]);
        
    return (
        <div className="anime-list">
            {newList.map(anime => (
                <Anime
                    key={anime.mal_id}
                    name={anime.title}
                    image={anime.image_url}
                />
            ))}
        </div>
    );
};

export default AnimeList;