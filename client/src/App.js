import React,{useEffect,createContext,useReducer,useContext}from 'react';
import Navbar from "./components/NavBar"
import "./App.css"
import {BrowserRouter,Route,Switch, useHistory} from "react-router-dom"
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signin from './components/screens/SignIn'
import Signup from './components/screens/Signup'
import UserProfile from './components/screens/UserProfile'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducer/userReducer'


export const UserContext = createContext()
const Routing = ()=>{
  const {state,dispatch}= useContext(UserContext)
  const history = useHistory()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    
    }else{
      history.push('/signin')
    }
  },[])
  return(
    <>
    <Switch>
    <Route exact path="/">
    <Home/>
    </Route>
    <Route path="/signin">
    <Signin/>
    </Route>
    <Route path="/signup">
    <Signup/>
    </Route>
    <Route exact path="/profile">
    <Profile/>
    </Route>
    <Route path="/create">
    <CreatePost/>
    </Route>
    <Route path="/profile/:userid">
    <UserProfile/>
    </Route>
    </Switch>
    </>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
