import React, { useState } from "react";
import Header from "../../components/Common/Header";
import Navigation from "../../components/Common/Navigation";
import Footer from "../../components/Common/Footer";
import "./Profile.css"; // Custom styles for Profile page

const Profile = () => {
  // Example static profile data; replace with dynamic data as needed
  const [profile, setProfile] = useState({
    fullName: "Dr. Alice Johnson",
    facultyId: "F2023",
    email: "alice.johnson@elearn.com",
    department: "Computer Science",
    role: "Faculty Member",
    profilePicture: "/assets/images/faculty-profile.jpg",
  });

  // Editable state
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save updated profile (API call can be added)
    setProfile(updatedProfile);
    setEditMode(false);
  };

  return (
    <div className="faculty-profile">
      {/* Header & Navigation */}
      <Header />
      <Navigation />
      <div className="breadcrumb">
        <span>Home</span> / <span>My Profile</span>
      </div>
      <h1>My Profile</h1>

      {/* Profile Overview Section */}
      <section className="profile-overview">
        <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>{profile.fullName}</h2>
          <p>ID: {profile.facultyId}</p>
          <p>Email: {profile.email}</p>
          <p>Department: {profile.department}</p>
          <p>Role: {profile.role}</p>
        </div>
      </section>

      {/* Editable Profile Information Section */}
      <section className="edit-profile">
        <h2>Edit Profile</h2>
        {editMode ? (
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={updatedProfile.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={updatedProfile.email}
                onChange={handleChange}
              />
            </div>
            {/* Additional fields as needed */}
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </section>

      {/* Additional Options/Navigation (Optional) */}
      <section className="profile-navigation">
        <ul>
          <li><a href="#personal">Personal Info</a></li>
          <li><a href="#academic">Academic Record</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
