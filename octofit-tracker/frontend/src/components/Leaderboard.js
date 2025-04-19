import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/leaderboard/')
      .then(response => response.json())
      .then(data => setLeaderboard(data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(entry => (
            <tr key={entry._id}>
              <td><Link to={`/users/${entry.user._id}`}>{entry.user.username}</Link></td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
