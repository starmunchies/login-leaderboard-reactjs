
import React, { useState } from 'react';
import axios from 'axios';
import { getToken} from './Utils/Common';

// note any localhost has to be changed to the actual ip address of where thenode js server is actually situated
// even if it is on the same server as react js doesnt know this as its on the client side

function Dashboard(props) {
  const token = getToken();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const usernameadd = useFormInput('');
  const xp = useFormInput('');
  //const user = getUser();


  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const handlexp = () => {

    axios.post('http://localhost:4000/database/incrementuser', { username: username.value, xp: xp.value }, config).then(response => {
      alert(username.value + " has been incremented by " + xp.value)

    }).catch(error => {
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");


    });
  }

  const handleadduser = () => {
    //checks if the username field is empty or not
    //NOTE
    //should also do a check to see if there is already a username with that name and prevent duplicate usernames
    if (usernameadd.value == null) {

      axios.post('http://localhost:4000/database/adduser', { username: usernameadd.value }, config).then(response => {
        alert(usernameadd.value + " has been created XP=0 ")

      }).catch(error => {
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");


      });
    }
    else
    {
      alert("Username cannot be null")
    }

  }

  /**
   * Implemented the logout into the navigation bar
   * 
   * 
   */

  return (
    <div>
      <div className="holder">
        <div className="login">
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
      </div>
      <div className="holder">
        <div className="login">
          <h4>Add New User</h4><br /><br />
          <div>
            Username<br />
            <input type="text" {...usernameadd} />
          </div>
          <input type="button" onClick={handleadduser} value="Add User" /><br />
        </div>
        <div className="login">
          <br /><br />
        </div>
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
