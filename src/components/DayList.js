import React from "react";
import DayListItem from "components/DayListItem";


export default function DayList (props) {
  const days = props.days.map(day => {
    return (
      <ul key ={day.id}>
          <DayListItem 
          key ={day.id}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}  />
      </ul>
    );
  });

  return days;
};