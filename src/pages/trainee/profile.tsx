import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  fetchTraineeProfile,
  updateTraineeProfile,
} from "../../Redux/traineeSlice";
import { useForm } from "react-hook-form";
import { AppDispatch } from "../../Redux/store";

const TraineeProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.trainee
  );
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchTraineeProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName,
        email: profile.email,
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: { fullName: string; email: string }) => {
    dispatch(updateTraineeProfile(data));
    setEditMode(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Trainee Profile</h1>
      <div className="bg-white p-6 rounded shadow-md">
        {!editMode ? (
          <div>
            <div className="mb-4">
              <p className="text-lg">
                <strong>Full Name:</strong> {profile?.fullName}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-lg">
                <strong>Email:</strong> {profile?.email}
              </p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-lg font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                {...register("fullName")}
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                className="w-full p-2 border border-gray-300 rounded"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded ml-4 hover:bg-gray-600"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TraineeProfile;
