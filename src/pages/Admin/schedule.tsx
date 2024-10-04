import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedules, createSchedule } from "../../Redux/scheduleSlice"; 

const SchedulePage = () => {
  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.schedule.schedules);
  const [newSchedule, setNewSchedule] = useState({
    date: "",
    time: "",
    duration: 2,
  });

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSchedule(newSchedule));
    setNewSchedule({ date: "", time: "", duration: 2 });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Class Scheduling</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-4">
        <input
          type="date"
          value={newSchedule.date}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, date: e.target.value })
          }
          className="mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="time"
          value={newSchedule.time}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, time: e.target.value })
          }
          className="mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Schedule
        </button>
      </form>
      <ul>
        {schedules.map((schedule) => (
          <li
            key={schedule.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{`${schedule.date} at ${schedule.time}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchedulePage;
