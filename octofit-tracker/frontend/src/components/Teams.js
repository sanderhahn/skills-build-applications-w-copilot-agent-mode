import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/teams/')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Teams</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.members ? team.members.map(member => (
                <span key={member._id}>
                  <Link to={`/users/${member._id}`}>{member.username}</Link>
                  {', '}
                </span>
              )) : 'No members'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
