import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

import logo from './assets/Anime_eye.svg';

import AnimeGallery from './AnimeGallery';
import MangaGallery from './MangaGallery';

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
    //set maximum number of users arbitrarily to 5
    if (users.length <= 5) {
      if (!(await getUser())) {
        //Appropriate Anime or Manga List should update
      }
      else {
        //invalid username, remove from list
        users.pop();
      }
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
          <div className="change-src">
            <Switch>
              <Route path="/manga">
                <Link to="/" title="Compare Anime Instead"></Link>
              </Route>
              <Route path="/">
                <Link to="/manga" title="Compare Manga Instead"></Link>
              </Route>
            </Switch>
          </div>
        </header>
        <main>
          <div className="user-list">
            {userdata.map(user => (
              <li key={user.username}>
                <a href={user.url}>{user.username}</a>
              </li>
            ))};
          </div>
          <Switch>
              <Route path="/manga">
                <MangaGallery users={users} endpoint={endpoint}/>
              </Route>
              <Route path="/">
                <AnimeGallery users={users} endpoint={endpoint}/>
              </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;