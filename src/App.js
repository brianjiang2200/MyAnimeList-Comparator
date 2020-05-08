import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

import logo from './assets/Anime_eye.svg';
import searchIcon from './assets/magnifying_glass.svg';
import mangaIcon from './assets/book-48.png';
import animeIcon from './assets/tv-48.png';

import AnimeGallery from './AnimeGallery';
import MangaGallery from './MangaGallery';

import getCommon from './Common';

import './App.css';

const App = () => {

  //INSTEAD OF ADDING STATES TO INDIVIDUAL COMPONENTS,
  //LIFT UP ALL STATES TO AVOID SETSTATE UNMOUNTING ISSUES 
  //Array of Users
  const [users, setUsers] = useState([]);
  //Search Value
  const [search, setSearch] = useState("");
  //Array of UserData
  const [userdata, setUserdata] = useState([]);
  //Array of AnimeLists
  const [animeLists, setAnimeLists] = useState([]);
  //Array of MangaLists
  const [mangaLists, setMangaLists] = useState([]);
  //Displayed Anime
  const [animeGallery, setAnimeGallery] = useState([]);
  //Displayed Manga
  const [mangaGallery, setMangaGallery] = useState([]);
  //Gallery index
  const [index, setIndex] = useState(0);

  const endpoint = "https://api.jikan.moe/v3";

  useEffect(() => {
    //ADD USER 
    const addUser = async () => {
    //set maximum number of users arbitrarily to 5
      if (users.length <= 5) {
        if (!(await getUser()))
          getList();
        else
          users.pop();
      }
  }
    addUser();
  }, [users]);

  //FETCH USER ANIME LIST
  const getList = async () => {
      if (users.length) {
          const query = users[users.length - 1];
          try {
              const animeresponse = await fetch (
                  `${endpoint}/user/${query}/animelist/all?sort=descending&order_by=title`
              );
              const animedata = await animeresponse.json();
              //IF USER EXISTS BUT CANNOT FETCH LIST
              if (animedata.type === "BadResponseException") {
                alert(`User ${query} has probably privated their AnimeList`);
                setAnimeLists([...animeLists, []]);
              }
              else {
                setAnimeLists([...animeLists, animedata.anime]);
                console.log(animedata);
              }
              const mangaresponse = await fetch (
                `${endpoint}/user/${query}/mangalist/all?sort=descending&order_by=title`
              );
              const mangadata = await mangaresponse.json();
              if (mangadata.type === "BadResponseException") {
                alert (`User ${query} has probably privated their MangaList`);
                setMangaLists([...mangaLists, []]);
              }
              else {
                setMangaLists([...mangaLists, mangadata.manga]);
                console.log(mangadata);
              }
          } 
          catch (err) {
              console.log(err);
          }
      }
  }

  //GET COMMON TITLES WHEN ANIMELISTS CHANGES VALUE
  useEffect(() => {
      getCommon(animeLists, setAnimeGallery);
  }, [animeLists]);

  //GET COMMON TITLES WHEN MANGALISTS CHANGES VALUE
  useEffect(() => {
      getCommon(mangaLists, setMangaGallery);
  }, [mangaLists]);

  const clearUsers = () => {
    setUsers([]);
    setUserdata([]);
    setAnimeLists([]);
    setMangaLists([]);
    setAnimeLists([]);
    setMangaGallery([]);
  }

  const flipMode = () => {
    setIndex(0);
  }

  //FETCH USER PROFILE DATA
  const getUser = async () => {
    if (users.length) {
      const query = users[users.length - 1];
      try {
        const response = await fetch (
          `${endpoint}/user/${query}/profile`
        );
        const data = await response.json();
        //VERIFY USERNAME
        if (data.type === "BadResponseException") {
          console.log("Invalid Username");
          return -1;
        }
        setUserdata([...userdata, data]);
      } 
      catch (err) {
        console.log("API Request Failed: " + err);
        return -1;
      }
      return 0;
    }
    return 0;
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setUsers([...users, search.toLowerCase()]);
    setSearch("");
  };

  return (
    <Router>
      <div className="app">
        <header>
          <div className="logo-container">
            <img id="logo" src={logo} alt="Logo"></img>
          </div>   
          <form onSubmit={getSearch} className="search-form">
            <input 
              type="text"
              placeholder="Username on MyAnimeList..." 
              className="search-bar soft-borders" 
              value={search} 
              onChange={updateSearch}/>
            <button 
              className="search-button soft-borders" 
              type="submit">
                <img className="submit-icon" src={searchIcon} alt=""></img>
            </button>
          </form>
          <div className="change-src soft-borders">
            <Switch>
              <Route path="/manga">
                <Link to="/" title="Compare Anime Instead" onClick={flipMode} className="soft-borders">
                  <img src={animeIcon} alt="" className="change-src-img"></img>
                </Link>
              </Route>
              <Route path="/">
                <Link to="/manga" title="Compare Manga Instead" onClick={flipMode} className="soft-borders">
                  <img src={mangaIcon} alt="" className="change-src-img"></img>
                </Link>
              </Route>
            </Switch>
          </div>
        </header>
        <main>
          <div className="user-list">
            <h1 className="user-list-title">Users</h1>
            <div className="users-container">
              {userdata.map(user => (
                <li key={user.username} className="user-panels soft-borders">
                  <a href={user.url} title={`Go to ${user.username}'s profile`}>{user.username}</a>
                </li>
              ))}
            </div>
            <div className="clear-users-ctr">
              <button className="clear-users soft-borders" onClick={clearUsers} title="Clear Users">X</button>
            </div>
          </div>
          <Switch>
              <Route path="/manga">
                <MangaGallery
                  gallery={mangaGallery}
                  index={index}
                  setIndex={setIndex}/>
              </Route>
              <Route path="/">
                <AnimeGallery 
                  gallery={animeGallery}
                  index={index}
                  setIndex={setIndex}/>
              </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;