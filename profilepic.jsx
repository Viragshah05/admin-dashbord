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
