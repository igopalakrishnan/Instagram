import React, { createContext, useContext, useEffect, useReducer } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import { initialState, reducer } from './reducers/UserReducer';
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPosts from './components/screens/SubscribedUserPost';

export const UserContext = createContext();


const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      //history.push('/')
    } else {
      history.push('/login')
    }
  }, [])

  return (
    <Switch>
      <Route exact path='/'><Home /></Route>
      <Route path='/login'><Login /></Route>
      <Route path='/signup'><Signup /></Route>
      <Route exact path='/profile'><Profile /></Route>
      <Route path='/createpost'><CreatePost /></Route>
      <Route path='/profile/:userid'><UserProfile /></Route>
      <Route path='/myfollowingposts'><SubscribedUserPosts /></Route>
    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
