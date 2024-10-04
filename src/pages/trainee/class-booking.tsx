import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store"; 
import {
  fetchAvailableClasses,
  bookClass,
  cancelClassBooking,
} from "../../Redux/classBookingSlice"; 
import { AppDispatch } from "../../Redux/store";

const ClassBooking: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { availableClasses, bookings, loading, error } = useSelector(
    (state: RootState) => state.classBooking
  );
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAvailableClasses());
  }, [dispatch]);

  const handleClassBooking = (classId: string) => {
    if (bookings.some((booking) => booking.classId === classId)) {
      alert("You have already booked this class.");
      return;
    }

    dispatch(bookClass(classId));
  };

  const handleCancelBooking = (classId: string) => {
    dispatch(cancelClassBooking(classId));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Class Booking</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableClasses.map((classInfo) => (
            <div key={classInfo.id} className="border p-4 rounded shadow">
              <p className="font-bold">{classInfo.title}</p>
              <p>Date: {classInfo.date}</p>
              <p>Time: {classInfo.time}</p>
              <p>Slots available: {classInfo.slotsAvailable}</p>
              {bookings.some((booking) => booking.classId === classInfo.id) ? (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleCancelBooking(classInfo.id)}
                >
                  Cancel Booking
                </button>
              ) : classInfo.slotsAvailable > 0 ? (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleClassBooking(classInfo.id)}
                >
                  Book Class
                </button>
              ) : (
                <p className="text-red-500">Class is full</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassBooking;
