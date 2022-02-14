import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  

  componentDidMount() {

    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };

    axios.get(`http://localhost:4000/leaderboard`,{crossdomain: true})
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <table class="styled-table">
      <thead >
      <tr>
      <th>User</th>
      <th>XP</th>
      </tr>
      </thead>
      <tbody>
        {
          this.state.persons
            .map(person =>

              <tr>
              <td key={person.id}>{person.username}</td>
              <td key={person.id}>{person.xp}</td>
              </tr>
            )
        }
        </tbody>
      </table>
    )
  }
}