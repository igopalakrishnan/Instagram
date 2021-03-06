import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

/**
* @author
* @function Signup
**/

const Signup = (props) => {

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if(url) {
      uploadFields()
    }
  }, [url])


  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Instagram-clone");
    data.append("cloud_name", "de3vcfg93");
    fetch("https://api.cloudinary.com/v1_1/de3vcfg93/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const uploadFields = () => {

    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email", classes: "#e53935 red darken-1" })
      return
    }
    fetch('/signup', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" })
        }
        else {
          M.toast({ html: data.message, classes: "#66bb6a green lighten-1" })
          history.push('/login')
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const postData = () => {
    if(image) {
      uploadPic()
    }else {
      uploadFields()
    }

  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field ">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue lighten-2">
            <span>Upload Image</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          onClick={() => postData()}>
          Signup
        </button>
        <h5>
          <Link to="/login"> Already have an account?</Link>
        </h5>
      </div>
    </div>
  )

}

export default Signup