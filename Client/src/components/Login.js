import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://notebook-1q3j.onrender.com/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    //console.log(json);
    if (json.success) {
      //Save the auth token and redirect 
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Logged in successfully", "success")
    } else {
      props.showAlert("Invalid Details", "danger")
    }

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <div className="mt-3">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="current-password" className="form-label">Password</label>
          <input type="current-password" value={credentials.password} onChange={onChange} className="form-control" name="password" id="current-password" />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
