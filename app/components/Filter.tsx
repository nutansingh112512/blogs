import { useState } from "react";

export default function Filter({
  setFilter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<number>>;
}) {
  const weekDays = {
    All: -1,
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const [selectedDay, setSelectedDay] = useState<string>("all");

  return (
    <div>
      <select
        value={selectedDay}
        onChange={(e) => {
          const value = e.target.value as keyof typeof weekDays;
          setSelectedDay(value);
          setFilter(weekDays[value]);
        }}
        id="weekDay"
      >
        {Object.keys(weekDays).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
}
