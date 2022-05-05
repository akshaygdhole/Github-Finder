import React, { useState, Fragment }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './component/Pages/About';
import User from './component/Users/User';
import Navbar from './component/layout/Navbar';
import Users from './component/Users/Users';  
import Search from './component/Users/Search';
import Alert from './component/layout/Alert';
import axios from 'axios';
import './App.css'; 

import GithubState from './context/github/GithubState';



const App = () => {
  const [users, setUsers] = useState([]);    
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alret, setAlert] = useState(null);


 //Search github users//
   const searchUsers =  async text => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&clinet_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get Single  Github user
   const getUser = async (username) => {
    setLoading(true)
    
    const res = await axios.get(`https://api.github.com/users/${username}?clinet_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  } 
  //Get users Repo

   const getUserRepos = async username => {
     setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&clinet_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
     setRepos(res.data)
    setLoading(false);   
  } 

  //Set Alert for no fileds are written//
    const showAlert = (msg,type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  };

  // Clear users from page 
  const clearUsers = () => {
    setUsers([]) 
    setLoading(false)
  }
 
  return (
      <GithubState>
      <Router>
    <div className="App">
       <Navbar/>
       <div className="container">
        <Alert  alert ={alert}/>
              <Routes>
                <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    < Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                   
                    <Users loading={loading} users={users} />
                  </Fragment>
                )} />
              
              <Route path='/about' element={About} exact/>
              <Route path={'./user:login'}
                element={<User
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading} />}/>
                </Routes>
                
              
       </div>
      </div> 
      </Router>
      </GithubState>
  );
    
  }
   export default App;
   