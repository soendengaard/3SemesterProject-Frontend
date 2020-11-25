import { getElementError } from "@testing-library/react";
import React, { useState,useEffect } from "react"
import facadeLoginout from "./facadeLoginout";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
 
  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
  }
 
  return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <h2>Login</h2>
              <form onChange={onChange} >
                <input placeholder="User Name" id="username" />
                <input placeholder="Password" id="password" />
                <button onClick={performLogin}>Login</button>
              </form>
          </div>
        </div>
      </div>
  )
 
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facadeLoginout.fetchUserData()
        .then(data=> setDataFromServer(data.msg))
  }, [])

  return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <h2>Data Received from server</h2>
            <h3>{dataFromServer}</h3>
          </div>
        </div>
      </div>
  )
 
}
 
function LoggingInOut({isLoggedIn, loginMsg, setLoginStatus}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 
  const logout = () => { 
    facadeLoginout.logout()
    setLoginStatus(!isLoggedIn);
    setLoggedIn(!loggedIn);
  } 

  const login = (user, pass) => {
    facadeLoginout.login(user,pass)
    .then((data)=> {
      setLoginStatus(!loggedIn);
      setLoggedIn(true)
      setErrorMsg("")
    }).catch(err =>{
        if(err.status){
          err.fullError.then((err)=>{
            setErrorMsg(err.message);
            console.log("ERROR " + err);
          })
        }  
        else{console.log("Network error"); }
     });;
  } 

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-9">
          {!isLoggedIn ? (
          <>
          <LogIn login={login} />
          <p>{errorMsg}</p>
          </>
          ) :
          (<div>
            <LoggedIn />
            <button onClick={logout}>{loginMsg}</button>
          </div>)} 
        </div>
      </div>
    </div>
  )
 
}
export default LoggingInOut;
 
