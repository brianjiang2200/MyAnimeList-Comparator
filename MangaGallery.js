import React, {useEffect, useState} from 'react';
import MangaList from './Manga-list';
import getCommon from './Common';

const MangaGallery = ({users, endpoint}) => {

    //Array of AnimeLists
    let [mangaLists, setMangaLists] = useState([]);
    //Displayed Anime
    const [gallery, setGallery] = useState([]);
    //Gallery index
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getList();
    }, [users]);

    useEffect(() => {
        getCommon(mangaLists, setGallery);
        setIndex(0);
      }, [mangaLists]);

    //FETCH USER ANIME LIST
    const getList = async () => {
        if (users.length) {
            const query = users[users.length - 1];
            try {
                const response = await fetch (
                    `${endpoint}/user/${query}/mangalist/all?sort=descending&order_by=title`
                );
                const data = await response.json();
                setMangaLists([...mangaLists, data.manga]);
                console.log(data.manga);
            } 
            catch (err) {
                console.log(err);
            }
        }
    }

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

    return (
        <div className="manga-gallery">
            <h1 className="gallery-title">Shared Manga</h1>
            <div className="gallery-container">
                <button className="next-btn" onClick={scrollBack}>&lt;</button>
                <MangaList 
                    list={gallery}
                    index={index}
                />
                <button className="prev-btn" onClick={scrollForward}>&gt;</button>
            </div>
        </div>
    );

}

export default MangaGallery;