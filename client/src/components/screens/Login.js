import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App';

/**
* @author
* @function Login
**/

const Login = (props) => {

  const {state, dispatch} = useContext(UserContext)

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const postData = () => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email", classes: "#e53935 red darken-1" })
      return
    }
    fetch('/signin', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" })
        }
        else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({type: "USER", payload: data.user})
          M.toast({ html: "Signedin successfully", classes: "#66bb6a green lighten-1" })
          history.push('/')
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div className="mycard">
      <div className="card auth-card input-field ">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
        onClick={()=>postData()}>
          Login
        </button>
        <h5>
          <Link to="/signup">Don't have an account?</Link>
        </h5>
      </div>
    </div>
  )

}

export default Login