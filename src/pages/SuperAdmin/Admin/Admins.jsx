import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import SuperAdminSidebar from "../common/SuperAdminSidebar/SuperAdminSidebar";
import RegProfile from "../common/regprofile/regprofile";
import './Admins.css';

const Admins = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [admins, setAdmins] = useState([]);
  const [modalData, setModalData] = useState(null); // For Add/Edit Modal
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility

  // Fetch admins from backend
  const fetchAdmins = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get/getAdmins.php`);
    const data = await response.json();
    setAdmins(data);
  };

  // Use effect to load admins on mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddAdmin = () => {
    setModalData(null); // Set to null for Add
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setModalVisible(true); // Show modal for Add
  };

  const handleEditAdmin = (admin) => {
    setModalData(admin);
    setFormData({ username: admin.Username, email: admin.Email, password: '', confirmPassword: '' });
    setModalVisible(true); // Show modal for Edit
  };

  const handleDeleteAdmin = async (adminID) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/deleteAdmin.php?id=${adminID}`, { method: 'DELETE' });
    if (response.ok) {
      fetchAdmins(); // Reload the admins after deletion
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const url = modalData ? `${import.meta.env.VITE_SERVER_URL}/post/editAdmin.php` : `${import.meta.env.VITE_SERVER_URL}/post/addAdmin.php`;
    const method = modalData ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, userID: modalData ? modalData.userID : null }),
    });

    if (response.ok) {
      fetchAdmins(); // Reload the admins after form submission
      setModalVisible(false); // Hide the modal
    }
  };

  return (
    <div className="AdminStatus1">
      <div className="AdminStatus1-1">
        <SuperAdminSidebar />
      </div>
      <div className="AdminStatus1-2">
        <div className="AdminStatus1-2-1">
          <RegProfile />
        </div>
        <div className="AdminStatus1-2-2">
          <div className="table-header">
            <h2>Admins</h2>
          </div>
          <hr className="divider-line" />
          <div className="actions-container">
            <div className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search Admins..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" />
            </div>
            <button className="add-admin-btn" onClick={handleAddAdmin}>
              <FaPlus className="add-icon" /> Add Admin
            </button>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins
                .filter((admin) => admin.Username.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((admin) => (
                  <tr key={admin.UserID}>
                    <td>{admin.UserID}</td>
                    <td>{admin.Username}</td>
                    <td>{admin.Email}</td>
                    <td>Active</td>
                    <td>
                      <button className="action-btn edit-btn" onClick={() => handleEditAdmin(admin)}>
                        <FaEdit /> Edit
                      </button>
                      <button className="action-btn delete-btn" onClick={() => handleDeleteAdmin(admin.UserID)}>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Add/Edit Admin Modal */}
          {modalVisible && (
            <div id="adminModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setModalVisible(false)}>×</span>
                <h3>{modalData ? 'Edit Admin' : 'Add Admin'}</h3>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                  <button type="submit">{modalData ? 'Update Admin' : 'Add Admin'}</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admins;
