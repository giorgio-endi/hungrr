import { useEffect, useRef, useState } from "react";
import { saveUserProfile, signOutUser } from "./firestore";
import { FaUser } from "react-icons/fa";

function ProfileScreen({ currentUser, userProfile, setUserProfile }) {
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    favouriteFood: "",
    cravingStyle: "",
    budget: "",
    bio: "",
    photoURL: "",
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || "",
        favouriteFood: userProfile.favouriteFood || "",
        cravingStyle: userProfile.cravingStyle || "",
        budget: userProfile.budget || "",
        bio: userProfile.bio || "",
        photoURL: userProfile.photoURL || "",
      });
    }
  }, [userProfile]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file || !currentUser) return;

    try {
      setSaving(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Image = event.target.result;
        const updatedProfile = { ...formData, uid: currentUser.uid, photoURL: base64Image };
        setFormData(updatedProfile);
        setUserProfile(updatedProfile);
        await saveUserProfile(currentUser.uid, updatedProfile);
        alert("Profile picture uploaded!");
        setSaving(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      alert("Could not upload profile picture.");
      setSaving(false);
    }
  }

  async function handleSaveProfile() {
    if (!currentUser) return;
    try {
      setSaving(true);
      const updatedProfile = { ...formData, uid: currentUser.uid };
      await saveUserProfile(currentUser.uid, updatedProfile);
      setUserProfile(updatedProfile);
      alert("Profile saved!");
    } catch (err) {
      console.error(err);
      alert("Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  // ----- STYLES -----
  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "7px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    marginTop: "5px",
    marginBottom: "12px",
    boxSizing: "border-box",
    backgroundColor: "#fdd0cd",
    color: "#000",
  };

  const labelStyle = { fontSize: "13px", fontWeight: "600", color: "#020100", marginTop: "10px" };

  const formBoxStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "18px",
    padding: "20px",
    width: "100%",
    maxWidth: "260px",
    margin: "0 auto",
    backgroundColor: "white",
    boxSizing: "border-box",
    textAlign: "left",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  };

  // ----- RENDER -----
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* TOP BAR SPACE */}
      <div style={{ height: "20px", backgroundColor: "#f4f8f9", flexShrink: 0 }} />

      {/* SCROLLABLE CONTENT */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 25px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
      <div style={{marginBottom: "25px"}}>
        <h1>
        Your Profile
        </h1>
      </div>

        {/* PROFILE IMAGE */}
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundColor: "#020100",
            margin: "0 auto 30px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => fileInputRef.current.click()}
        >
          {formData.photoURL ? (
            <img src={formData.photoURL} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: "72px", color: "#f4f8f9" }}>
              <FaUser />
            </span>
          )}
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />

        {/* FORM */}
        <div style={formBoxStyle}>
          <p style={labelStyle}>Username</p>
          <input name="username" value={formData.username} onChange={handleChange} style={inputStyle} />

          <p style={labelStyle}>Favourite Food</p>
          <input name="favouriteFood" value={formData.favouriteFood} onChange={handleChange} style={inputStyle} />

          <p style={labelStyle}>Craving Style</p>
          <input name="cravingStyle" value={formData.cravingStyle} onChange={handleChange} style={inputStyle} />

          <p style={labelStyle}>Budget</p>
          <input name="budget" value={formData.budget} onChange={handleChange} style={inputStyle} />

          <p style={labelStyle}>Bio</p>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            style={{ ...inputStyle, resize: "none", marginBottom: "50px", fontFamily: "inherit" }}
          />

          <button onClick={handleSaveProfile} disabled={saving} className="hover-darken save-btn">
            {saving ? "Saving..." : "Save Profile"}
          </button>

          <button onClick={signOutUser} className="hover-darken logout-btn">
            Sign Out
          </button>
        </div>
      </div>

      {/* HIDE SCROLLBAR & BUTTON HOVER */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;     /* Firefox */
          }

          /* BUTTON HOVER EFFECT */
          .hover-darken {
            width: 100%;
            padding: 14px;
            border-radius: 7px;
            border: none;
            color: white;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            margin-bottom: 12px;
            transition: filter 0.2s;
          }
          .save-btn {
            background-color: #4b6043;
          }
          .save-btn:hover {
            filter: brightness(0.85);
          }
          .logout-btn {
            background-color: #991c1a;
          }
          .logout-btn:hover {
            filter: brightness(0.85);
          }
        `}
      </style>
    </div>
  );
}

export default ProfileScreen;