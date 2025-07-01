import React, { useState, useEffect } from "react";
import "./Pages css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    role: "",
    email: "",
    photo: "",
  });

  const [preview, setPreview] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  // ✅ Fetch current user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_ORIGIN}/api/users/profile`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        if (data.success) {
          setUser(data.user);

          if (data.user.photo?.data && data.user.photo?.contentType) {
            // Proper base64 + contentType image
            setPreview(`data:${data.user.photo.contentType};base64,${data.user.photo.data}`);
          } else {
            // Fallback to null
            setPreview(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreview(URL.createObjectURL(file)); // local preview
    }
  };

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("email", user.email);
    if (newPassword) formData.append("password", newPassword);
    if (photoFile) formData.append("photo", photoFile);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_ORIGIN}/api/users/update-profile`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );
      const result = await res.json();
      if (result.success) {
        alert("Profile updated successfully");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update failed", err);
      alert("Server error");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="left-section">
          <img
            src={preview || "https://placehold.co/150x150"}
            alt="Profile"
            className="profile-img"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="upload-input"
          />
        </div>

        <div className="right-section">
          <h2>My Profile</h2>

          <div className="info-group">
            <label>Username:</label>
            <input value={user.username} disabled />
          </div>

          <div className="info-group">
            <label>Role:</label>
            <input value={user.role} disabled />
          </div>

          <div className="info-group">
            <label>Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="info-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="info-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="update-btn" onClick={handleUpdate}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
