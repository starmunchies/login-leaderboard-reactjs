import React from 'react';
import PersonList from './components/leaderboardlist.js';
import './table.css';

function Home() {

// returns leaderboard from leaderboardlist.js
// turned it into a class called person list that can be calledwithing the return
  return (
    <div>
   
    <PersonList/>
    
    </div>
  );
}

export default Home;
