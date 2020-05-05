import React from 'react';
import Manga from './Manga';

const MangaList = (props) => {
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
            <div className="manga-list">
                {list.map(manga => (
                    <Manga
                        key={manga.mal_id}
                        name={manga.title}
                        image={manga.image_url} 
                    />
                ))};
            </div>
        );
    } else {
        return (
            <div className="manga-list">

            </div>
        );
    }
};

export default MangaList;