import React, {useEffect, useState} from 'react';
import logo from './assets/Anime_eye.svg';
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
  let [animeLists, setAnimeLists] = useState([]);
  //Displayed Anime
  const [gallery, setGallery] = useState([]);
  //Gallery index
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
        //NEED TO PERFORM DEEP COPY
        setAnimeLists([...animeLists, data.anime]);
        console.log(data.anime);
      } 
      catch (err) {
        console.log(err);
      }
    }
  }

  //DEBUG
  const testStates = () => {
    console.log(animeLists);
    console.log(userdata);
  }

    //GET GALLERY ANIME
    const getGallery = () => {
      try {
        //CREATE A COPY OF EACH ANIMELIST
        let lists = [];
        for (let i = 0; i < animeLists.length; ++i) {
          lists.push(JSON.parse(JSON.stringify(animeLists[i])));
        }
        //GET COMMON ARRAY ELEMENTS 
        let result = [];
        if (lists.length) {
          //FOR EACH ELEMENT IN THE FIRST LIST...
          for (let j = 0; j < lists[0].length; ++j) {
            const found = lists[0][j].title;

            //FIND THE ELEMENT IF IT EXISTS IN ALL OTHER LISTS AND ADD TO GALLERY
            for (let k = 1; k < lists.length; ++k) {
              //No elements left 
              if (!lists[k].length) 
                break;
              //IF FIRST TITLE OF A LIST LARGER THAN FOUND, TITLE NOT SHARED, MOVE TO NEXT TITLE
              if (lists[k][0].title > found) {
                break;
              }

              else {
                //REMOVE "<" ANIME CURRENTLY AT THE START OF EACH LIST
                while (lists[k][0].title < found) {
                  lists[k].shift();
                }
                if (lists[k].length && lists[k][0].title !== found) {
                  break;
                }
              }

              //IF THE END OF LOOP REACHED, PUSH THE TITLE ONTO GALLERY
              if (k === lists.length - 1) {
                result.push(lists[0][j]);
              }
            } //END INNER FOR LOOP

          } //END OUTER FOR LOOP
        }
        console.log(result);
      } catch (err) {
        console.log(err);
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
            list={(animeLists.length) ? animeLists[0] : []}
            index={index}
          />
        </div>
        <div>
          <button className="next-btn" onClick={scrollForward}>Next 4 Anime</button>
          <button className="prev-btn" onClick={scrollBack}>Previous 4 Anime</button>
          <button onClick={getGallery}>Get Gallery</button>
          <button onClick={testStates}>Test States</button>
        </div>
      </main>
    </div>
  );
};

export default App;