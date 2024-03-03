import React, { useState } from "react";
import "./TimeSlot.css";

function TimeSlotPopup({ onSelectTimeSlot, openingTime, closingTime, selectedTimeSlots }) {
  // Ensure selectedSlots is initialized as an array
  const [selectedSlots, setSelectedSlots] = useState(selectedTimeSlots || []);

  const handleTimeSlotSelection = (timeSlot) => {
    const index = selectedSlots.findIndex(slot => slot.startTime === timeSlot.startTime && slot.endTime === timeSlot.endTime);
    let newSelectedTimeSlots = [];
    if (index === -1) {
      newSelectedTimeSlots = [...selectedSlots, timeSlot];
    } else {
      newSelectedTimeSlots = selectedSlots.filter(slot => !(slot.startTime === timeSlot.startTime && slot.endTime === timeSlot.endTime));
    }
    setSelectedSlots(newSelectedTimeSlots);
    onSelectTimeSlot(newSelectedTimeSlots);
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startTime = new Date(`2000-01-01T${openingTime}`);
    const endTime = new Date(`2000-01-01T${closingTime}`);

    let currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      const endTimeSlot = new Date(currentTime);
      endTimeSlot.setHours(endTimeSlot.getHours() + 1);

      slots.push({
        startTime: new Date(currentTime),
        endTime: new Date(endTimeSlot),
      });
      currentTime.setHours(currentTime.getHours() + 1);
    }
    return slots;
  };

  
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Select Time Slot</h2>
        <div className="time-slots">
          {generateTimeSlots().map((timeSlot, index) => (
            <button
              key={index}
              onClick={() => handleTimeSlotSelection(timeSlot)} 
              className={`time-slot-button ${selectedSlots.find(slot => slot.startTime === timeSlot.startTime && slot.endTime === timeSlot.endTime) ? 'selected' : ''}`} // Use find instead of some
            >
              {`${timeSlot.startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${timeSlot.endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeSlotPopup;
