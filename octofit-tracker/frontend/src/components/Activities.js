import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Activity Type</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity._id}>
              <td><Link to={`/users/${activity.user?._id}`}>{activity.user?.username || 'N/A'}</Link></td> {/* Display the username of the user */}
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
