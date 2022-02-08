
import React, { useState } from 'react';
import axios from 'axios';
import { getToken, getUser, removeUserSession } from './Utils/Common';


function Dashboard(props) {
  const token = getToken();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const usernameadd = useFormInput('');
  const xp = useFormInput('');
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const handlexp = () => {

    axios.post('http://localhost:4000/database/incrementuser', { username: username.value, xp: xp.value },config).then(response => {
      alert(username.value + " has been incremented by " + xp.value)

    }).catch(error => {
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");


    });
  }

  const handleadduser = () => {

    axios.post('http://localhost:4000/database/adduser', { username: usernameadd.value },config ).then(response => {
      alert(usernameadd.value + " has been created XP=0 ")

    }).catch(error => {
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");


    });
  }

  return (
    <div>
      <div class ="login">
        <h4>Add XP</h4><br /><br />
        <div>
          Username<br />
          <input type="text" {...username} />
        </div>
        <div style={{ marginTop: 10 }}>
          Amount<br />
          <input type="text" {...xp} />
        </div>
        <input type="button" onClick={handlexp} value="Update xp" /><br />
        <br /><br />
      </div>

      <div class="login">
        <h4>Add New User</h4><br /><br />
        <div>
          Username<br />
          <input type="text" {...usernameadd} />
        </div>
        <input type="button" onClick={handleadduser} value="Add User" /><br />
      </div>
      <div class="login">
        <br /><br />
        <input type="button" onClick={handleLogout} value="Logout" />
      </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
export default Dashboard;
