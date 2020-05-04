import React, {useEffect, useState} from 'react';
import logo from './assets/Anime_eye.svg';
import Anime from './Anime';
import AnimeList from './Anime-list';
import './App.css';

const App = () => {

  //Array of Users
  const [users, setUsers] = useState([]);
  //Search Value
  const [search, setSearch] = useState("");
  //Array of UserData
  const [userdata, setUserdata] = useState([]);
  //Array of AnimeLists
  const [animeLists, setAnimeLists] = useState([]);
  //Anime List index
  const [index, setIndex] = useState(0);

  const endpoint = "https://api.jikan.moe/v3";

  //ADD USER 
  const addUser = async () => {
    if (!(await getUser())) {
      getList();
    }
    else {
      //INVALID USERNAME, REMOVE FROM LIST
      users.pop();
    }
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
        console.log(data);
      } 
      catch (err) {
        console.log("API Request Failed: " + err);
        return -1;
      }
      return 0;
    }
    return 0;
  }

  //FETCH USER ANIME LIST
  const getList = async () => {
    if (users.length) {
      const query = users[users.length - 1];
      try {
        const response = await fetch (
          `${endpoint}/user/${query}/animelist/all?sort=descending&order_by=title`
        );
        const data = await response.json();
        setAnimeLists([...animeLists, data]);
        console.log(data);
      } 
      catch (err) {
        console.log(err);
      }
    }
  }

  //Get next 4 anime
  const scrollForward = () => {
    if (animeLists.length && index < animeLists[0].anime.length) {
      setIndex(index + 4);
    }
  }

  //Get previous 4 anime 
  const scrollBack = () => {
    if (index > 0) {setIndex(index - 4);}
  }

  useEffect(() => {
    addUser();
  }, [users]);

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setUsers([...users, search]);
    setSearch("");
  };

  return (
    <div className="app">
      <header>
        <div className="logo-container">
          <img id="logo" src={logo} alt="Logo"></img>
          <h3 className="app-name">User Search</h3>
        </div>   
        <form onSubmit={getSearch} className="search-form">
          <input 
            type="text"
            placeholder="Username on MyAnimelist..." 
            className="search-bar" 
            value={search} 
            onChange={updateSearch}/>
          <button 
            className="search-button" 
            type="submit">
              Get User's MyAnimelist
          </button>
        </form>
      </header>
      <main>
        <div className="user-list">
          {userdata.map(user => (
            <li key={user.username}>
              <a href={user.url} target="_blank">{user.username}</a>
            </li>
          ))};
        </div>
        <div className="anime-list">
          <h1>Shared Anime</h1>
          <AnimeList 
            list={(animeLists.length) ? animeLists[0].anime : []}
            index={index}
          />
          <button className="next-btn" onClick={scrollForward}>Next 4 Anime</button>
          <button className="prev-btn" onClick={scrollBack}>Previous 4 Anime</button>
        </div>
      </main>
    </div>
  );
};

export default App;