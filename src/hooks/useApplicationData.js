import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = `http://localhost:8001`; 
export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get(`${baseURL}/api/days`),
      axios.get(`${baseURL}/api/appointments`),
      axios.get(`${baseURL}/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  },[]);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const selectedDay = (element) => element.name === state.day;
    const index = state.days.findIndex(selectedDay);
    const days = [...state.days];
    if (state.appointments[id].interview === null) {
      days[index] = {...days[index], spots : days[index].spots - 1};
    };
    return(
      axios.put(`${baseURL}/api/appointments/${id}`, {interview}).then(() => {
        setState({...state,days,appointments})
      })
    );
  };

  function cancelInterview (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const selectedDay = (element) => element.name === state.day;
    const index = state.days.findIndex(selectedDay);
    const days = [...state.days];
    days[index] = {...days[index], spots : days[index].spots + 1};
    return(
      axios.delete(`${baseURL}/api/appointments/${id}`, {interview}).then(() =>
      setState({...state,days,appointments}))
    );
  };
  return(
    {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
  );
};