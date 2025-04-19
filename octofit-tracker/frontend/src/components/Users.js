import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = () => {
    setLoading(true);
    fetch('https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/users/')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/users/${userId}/`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete user');
          // Remove the deleted user from the state
          setUsers(users.filter(user => user._id !== userId));
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          setError(error.message);
        });
    }
  };

  if (loading) {
    return <div className="container">Loading users...</div>;
  }

  if (error) {
    return <div className="container alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Users</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/users/create')}
        >
          Add New User
        </button>
      </div>
      
      {users.length === 0 ? (
        <p>No users found. Create a new user to get started.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td><Link to={`/users/${user._id}`}>{user.username}</Link></td>
                <td>{user.email}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={() => navigate(`/users/edit/${user._id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
