import React from 'react';
import MangaList from './Manga-list';

const MangaGallery = ({gallery, index, setIndex}) => {

    //Get next 4 manga
    const scrollForward = () => {
        if (gallery.length && index < gallery.length - 4) {
            setIndex(index + 4);
        }
    }

    //Get previous 4 manga 
    const scrollBack = () => {
        if (index > 0) {setIndex(index - 4);}
    }

    let gallerycontainer;
    if (gallery.length) {
        gallerycontainer = 
        <div className="gallery-container">
            <button className="next-btn soft-borders" onClick={scrollBack}>&lt;</button>
            <MangaList 
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
        <div className="manga-gallery">
            <h1 className="gallery-title">Shared Manga</h1>
            {gallerycontainer}
        </div>
    );

}

export default MangaGallery;