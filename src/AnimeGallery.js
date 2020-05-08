import React from 'react';
import AnimeList from './Anime-list';

const AnimeGallery = ({gallery, index, setIndex}) => {

    //Get next 4 anime
    const scrollForward = () => {
        if (gallery.length && index < gallery.length - 4) {
            setIndex(index + 4);
        }
    }

    //Get previous 4 anime 
    const scrollBack = () => {
        if (index > 0) {setIndex(index - 4);}
    }

    let gallerycontainer;
    if (gallery.length) {
        gallerycontainer = 
        <div className="gallery-container">
            <button className="next-btn soft-borders" onClick={scrollBack}>&lt;</button>
            <AnimeList 
                list={gallery}
                index={index}
            />
            <button className="prev-btn soft-borders" onClick={scrollForward}>&gt;</button>  
        </div>
    }
    else {
        gallerycontainer = 
        <div className="gallery-container">
            <h2 className="empty-gallery-text soft-borders">Gallery is Empty.</h2>
        </div>
    }

    return (
        <div className="anime-gallery">
            <h1 className="gallery-title">Shared Anime</h1>
            {gallerycontainer}
        </div>
    );

}

export default AnimeGallery;