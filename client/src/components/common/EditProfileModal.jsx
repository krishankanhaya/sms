import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import editProfileSchema from "../../schema/editProfileSchema.js";
import { formatDateToYYYYMMDD } from '../../services/utils.js'

const EditProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  console.log('user path', profileData)
  const [preview, setPreview] = useState(
    profileData?.profile ? `http://localhost:5000/media/${profileData.profile}` : "https://via.placeholder.com/150"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: "",
      dob: "",
      branch: "",
      subject: "",
    },
  });

  useEffect(() => {
    if (profileData) {
      reset({
        ...profileData,
        dob: profileData.dob ? formatDateToYYYYMMDD(profileData.dob) : "",
      });

      setPreview(profileData.profile
        ? `http://localhost:5000/media/${profileData.profile}`
        : "https://via.placeholder.com/150"
      );
    }
  }, [profileData, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    data.email = profileData.email;
    onSave(data);
    onClose();
  };

  if (!isOpen || !profileData) return null;

  return (
    <div className="fixed bg-gray-400 inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          <span onClick={onClose} className="text-xl text-red-500 cursor-pointer border p-1 px-4 items-center rounded-[50%]">x</span>
        </div>
        <img src={preview || "https://via.placeholder.com/150"} alt="Preview" className="w-20 m-auto h-20 rounded-full object-cover mb-2" />
        <form className="flex flex-row flex-wrap" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="flex col-6 w-[80%] m-auto lg:w-[50%] px-2 flex-col items-center">
            <label className="block text-left mt-3 w-full text-sm font-semibold">New Profile Image</label>
            <input type="file" {...register("profile")} accept="image/jpeg, image/png" onChange={handleImageChange} className="w-full p-1 border rounded" />
            {errors.profile && <span className="text-red-500 text-sm w-full text-left">{errors.profile.message}</span>}
          </div>

          <div className="flex col-6 w-[80%] m-auto lg:w-[50%] px-2 flex-col items-center">
            <label className="block text-left mt-3 w-full text-sm font-semibold">Name</label>
            <input {...register("name")} type="text" className="w-full p-2 border rounded" />
            {errors.name && <span className="text-red-500 text-sm w-full text-left">{errors.name.message}</span>}
          </div>

          <div className="flex col-6 w-[80%] m-auto lg:w-[50%] px-2 flex-col items-center">
            <label className="block text-left mt-3 w-full text-sm font-semibold">Date of Birth</label>
            <input {...register("dob")} type="date" className="w-full p-2 border rounded" />
            {errors.dob && <span className="text-red-500 text-sm w-full text-left">{errors.dob.message}</span>}
          </div>

          <div className="flex col-6 w-[80%] m-auto lg:w-[50%] px-2 flex-col items-center">
            <label className="block text-left mt-3 w-full text-sm font-semibold">Branch</label>
            <select {...register("branch")} className="w-full p-2 border rounded">
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ME">ME</option>
              <option value="ECE">ECE</option>
              <option value="AI">AI</option>
            </select>
            {errors.branch && <span className="text-red-500 text-sm w-full text-left">{errors.branch.message}</span>}
          </div>

          <div className="flex col-6 w-[80%] m-auto lg:w-[50%] px-2 flex-col items-center">
            <label className="block text-left mt-3 w-full text-sm font-semibold">Subject</label>
            <select {...register("subject")} className="w-full p-2 border rounded">
              <option value="">Select Subject</option>
              <option value="English">English</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
            </select>
            {errors.subject && <span className="text-red-500 text-sm w-full text-left">{errors.subject.message}</span>}
          </div>

          <div className="flex col-6 w-[80%] mt-8 m-auto lg:w-[50%] px-2 flex-col items-center">
            <button type="submit" className="bg-green-200 text-green-600 font-bold w-[100%] text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
