import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../../Redux/trainerSlice"; 

const TrainerClasses = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.trainer.classes); 

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Classes</h1>
      <ul>
        {classes.map((classInfo) => (
          <li
            key={classInfo.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{`${classInfo.date} at ${classInfo.time}`}</span>
            <span>{classInfo.trainees.length} Trainees</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainerClasses;
