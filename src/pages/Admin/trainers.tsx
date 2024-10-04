import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrainers,
  addTrainer,
  deleteTrainer,
} from "../../Redux/trainerSlice"; 

const TrainersPage = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainer.trainers);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTrainer(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Manage Trainers</h1>
      <ul>
        {trainers.map((trainer) => (
          <li
            key={trainer.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{trainer.name}</span>
            <button
              onClick={() => handleDelete(trainer.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainersPage;
