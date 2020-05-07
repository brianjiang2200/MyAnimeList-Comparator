import React, {useEffect, useState} from 'react';
import AnimeList from './Anime-list';
import getCommon from './Common';

const AnimeGallery = ({users, endpoint}) => {

    //Array of AnimeLists
    let [animeLists, setAnimeLists] = useState([]);
    //Displayed Anime
    const [gallery, setGallery] = useState([]);
    //Gallery index
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getList();
    }, [users]);

    useEffect(() => {
        getCommon(animeLists, setGallery);
        setIndex(0);
      }, [animeLists]);

    //FETCH USER ANIME LIST
    const getList = async () => {
        if (users.length) {
            const query = users[users.length - 1];
            try {
                const response = await fetch (
                    `${endpoint}/user/${query}/animelist/all?sort=descending&order_by=title`
                );
                const data = await response.json();
                setAnimeLists([...animeLists, data.anime]);
                console.log(data.anime);
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
        <div className="anime-gallery">
            <h1 className="gallery-title">Shared Anime</h1>
            <div className="gallery-container">
                <button className="next-btn" onClick={scrollBack}>&lt;</button>
                <AnimeList 
                    list={gallery}
                    index={index}
                />
                <button className="prev-btn" onClick={scrollForward}>&gt;</button>
            </div>
        </div>
    );

}

export default AnimeGallery;