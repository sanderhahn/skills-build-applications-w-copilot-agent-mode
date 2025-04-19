import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we're in edit mode, fetch the user data
    if (isEditMode) {
      setLoading(true);
      fetch(`https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/users/${id}/`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch user data');
          return response.json();
        })
        .then(data => {
          setFormData({
            username: data.username,
            email: data.email,
            password: '' // Don't display the password for security reasons
          });
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate the form
    if (!formData.username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    
    if (!isEditMode && !formData.password.trim()) {
      setError('Password is required for new users');
      setLoading(false);
      return;
    }

    const url = isEditMode 
      ? `https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/users/${id}/`
      : 'https://reimagined-space-waddle-wwg44x66x25j4-8000.app.github.dev/api/users/';
    
    const method = isEditMode ? 'PUT' : 'POST';
    
    // If password is empty in edit mode, omit it from the request
    const dataToSend = isEditMode && !formData.password.trim()
      ? { username: formData.username, email: formData.email }
      : formData;
    
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to save user');
        return response.json();
      })
      .then(data => {
        setLoading(false);
        // Redirect to the users list after successful save
        navigate('/users');
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (loading && isEditMode) {
    return <div className="container mt-4">Loading user data...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{isEditMode ? 'Edit User' : 'Create User'}</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            {isEditMode ? 'Password (leave blank to keep current)' : 'Password'}
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEditMode}
          />
        </div>
        
        <div className="d-flex justify-content-between">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/users')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
