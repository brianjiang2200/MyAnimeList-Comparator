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
            <h1>Shared Manga</h1>
            <MangaList 
                list={gallery}
                index={index}
            />
            <div className="gallery-scroll">
                <button className="next-btn" onClick={scrollForward}>Next 4 Manga</button>
                <button className="prev-btn" onClick={scrollBack}>Previous 4 Manga</button>
            </div>
        </div>
    );

}

export default MangaGallery;