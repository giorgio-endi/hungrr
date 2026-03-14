import { useRef, useState } from "react";
import { saveUserProfile, uploadProfilePicture } from "./firestore";

function ProfileScreen({ currentUser, userProfile, setUserProfile }) {
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: userProfile?.username || "",
    favouriteFood: userProfile?.favouriteFood || "",
    cravingStyle: userProfile?.cravingStyle || "",
    budget: userProfile?.budget || "",
    bio: userProfile?.bio || "",
    photoURL: userProfile?.photoURL || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSaveProfile() {
    if (!currentUser) return;

    try {
      setSaving(true);
      await saveUserProfile(currentUser.uid, formData);
      setUserProfile(formData);
      alert("Profile saved!");
    } catch (error) {
      console.error(error);
      alert("Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file || !currentUser) return;

    try {
      setSaving(true);
      const imageUrl = await uploadProfilePicture(currentUser.uid, file);

      const updatedData = {
        ...formData,
        photoURL: imageUrl,
      };

      setFormData(updatedData);
      setUserProfile(updatedData);
      alert("Profile picture uploaded!");
    } catch (error) {
      console.error(error);
      alert("Could not upload profile picture.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h1>Your Profile</h1>

      <div
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          backgroundColor: "#5bb8eb",
          margin: "0 auto 24px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {formData.photoURL ? (
          <img
            src={formData.photoURL}
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span style={{ fontSize: "72px", color: "white" }}>👤</span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <button
        onClick={() => fileInputRef.current.click()}
        style={{
          width: "230px",
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          backgroundColor: "#4da8da",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "18px",
        }}
      >
        Add Profile Picture
      </button>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "20px",
          width: "260px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <p><strong>Username</strong></p>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <p><strong>Favourite food</strong></p>
        <input
          name="favouriteFood"
          value={formData.favouriteFood}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <p><strong>Craving style</strong></p>
        <input
          name="cravingStyle"
          value={formData.cravingStyle}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <p><strong>Budget</strong></p>
        <input
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <p><strong>Bio</strong></p>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          style={{ width: "100%", marginBottom: "14px", padding: "8px" }}
        />

        <button
          onClick={handleSaveProfile}
          disabled={saving}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#2f7fb5",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </>
  );
}

export default ProfileScreen;
