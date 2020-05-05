import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import logo from './assets/Anime_eye.svg';

import AnimeGallery from './AnimeGallery';

import './App.css';

const App = () => {

  //Array of Users
  const [users, setUsers] = useState([]);
  //Search Value
  const [search, setSearch] = useState("");
  //Array of UserData
  const [userdata, setUserdata] = useState([]);

  const endpoint = "https://api.jikan.moe/v3";

  useEffect(() => {
    addUser();
  }, [users]);

  //ADD USER 
  const addUser = async () => {
    if (!(await getUser())) {
      //Appropriate Anime or Manga List should update
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

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setUsers([...users, search]);
    setSearch("");
  };

  return (
    <Router>
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
                Add User
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
          <AnimeGallery users={users} endpoint={endpoint}/>
        </main>
      </div>
    </Router>
  );
};

export default App;