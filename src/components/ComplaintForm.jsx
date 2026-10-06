import React, { useState } from "react";
import axios from "axios";
function ComplaintForm() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");

  // Get GPS Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
        alert("Location access denied");
      }
    );
  };

   
  // Submit Complaint
  const submitComplaint = async () => {
    if (!location) {
      alert("Please enable location first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("lat", location.lat);
    formData.append("lng", location.lng);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/complaints",
        formData
      );

      setMessage("Complaint Submitted Successfully");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Waste Complaint Form</h2>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <br /><br />

      <button onClick={getLocation}>
        Enable GPS Location
      </button>

      <br /><br />

      {location && (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}

      <button onClick={submitComplaint}>
        Submit Complaint
      </button>

      <p>{message}</p>
    </div>
  );
}

export default ComplaintForm;