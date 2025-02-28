import React, { useState } from "react";
import { Formik, Form } from "formik";

const defaultProfile = "https://via.placeholder.com/150"; // Default User Icon

const ProfilePictureForm = () => {
  const [profilePhoto, setProfilePhoto] = useState(defaultProfile);

  return (
    <Formik
      initialValues={{ profilePhoto: null }}
      onSubmit={(values) => {
        const formData = new FormData();
        if (values.profilePhoto) {
          formData.append("profilePhoto", values.profilePhoto);
        }
        console.log("Form Submitted", formData);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col items-center">
          {/* Profile Picture Display */}
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full border mb-2"
          />

          {/* Change & Delete Buttons */}
          <div className="flex gap-2">
            <label className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    setProfilePhoto(URL.createObjectURL(file));
                    setFieldValue("profilePhoto", file);
                  }
                }}
              />
            </label>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => {
                setProfilePhoto(defaultProfile);
                setFieldValue("profilePhoto", null);
              }}
            >
              Delete
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded mt-4">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfilePictureForm;





//Map functionality

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// 📌 Handle Form Submission (API call)
const handleSubmit = async (values) => {
  try {
    console.log("Submitting Form:", values);
    const response = await axios.post("https://api.example.com/location", values);
    console.log("API Response:", response.data);
  } catch (error) {
    console.error("Error submitting location:", error);
  }
};

// 📌 Map Click Handler Component
const LocationPicker = ({ setFieldValue }) => {
  const [position, setPosition] = useState([22.5726, 88.3639]); // Default: Kolkata, India

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setFieldValue("latitude", lat);
      setFieldValue("longitude", lng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

// 📌 Main Form Component
const MapForm = () => {
  return (
    <Formik
      initialValues={{ latitude: "", longitude: "", location: "" }}
      onSubmit={handleSubmit} // 🔹 Passing handleSubmit function
    >
      {({ setFieldValue, values }) => (
        <Form className="max-w-md mx-auto p-4 shadow-lg rounded-lg">
          {/* Search Input */}
          <div className="mb-2">
            <label className="block">Search Location:</label>
            <Field
              type="text"
              name="location"
              className="border rounded w-full p-2"
              onChange={(e) => setFieldValue("location", e.target.value)}
            />
          </div>

          {/* Map */}
          <MapContainer center={[22.5726, 88.3639]} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker setFieldValue={setFieldValue} />
          </MapContainer>

          {/* Latitude & Longitude */}
          <div className="mt-2">
            <label>Latitude:</label>
            <Field type="text" name="latitude" readOnly className="border w-full p-2" value={values.latitude} />
          </div>

          <div className="mt-2">
            <label>Longitude:</label>
            <Field type="text" name="longitude" readOnly className="border w-full p-2" value={values.longitude} />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded mt-4 w-full">
            Mark Location
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MapForm;
  
