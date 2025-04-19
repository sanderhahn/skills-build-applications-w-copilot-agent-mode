import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/users/${id}/`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch user details');
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/users/${id}/`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete user');
          navigate('/users');
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          setError(error.message);
        });
    }
  };

  if (loading) {
    return <div className="container">Loading user details...</div>;
  }

  if (error) {
    return <div className="container alert alert-danger">Error: {error}</div>;
  }

  if (!user) {
    return <div className="container">User not found</div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>User Details</h1>
        <div>
          <button 
            className="btn btn-outline-primary me-2" 
            onClick={() => navigate('/users')}
          >
            Back to Users
          </button>
          <button 
            className="btn btn-primary me-2" 
            onClick={() => navigate(`/users/edit/${id}`)}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger" 
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header">
          <h3>{user.username}</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th style={{width: "200px"}}>Username</th>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              {/* Password field is intentionally not displayed for security reasons */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
