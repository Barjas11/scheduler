import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";






export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETEING = "DELETEING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(() => {transition(SHOW)})
    .catch(() => {transition(ERROR_SAVE, true)});
  };

  function deleteInterview() {
    const interview = null;
    transition(DELETEING);
    props.cancelInterview(props.id, interview)
    .then(() => {transition(EMPTY)})
    .catch(() => {transition(ERROR_DELETE, true)});
  };
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );




  return (
    <article className="appointment" data-testid="appointment">
      <Header
      time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
      )}
      {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />
        )}
        {mode === SAVING && (
        <Status
          message="Saving"
        />)}
        {mode === DELETEING && (
        <Status
          message="Deleting"
        />)}
        {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
        />)}
        {mode === EDIT && (
        <Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        />
        )}
        {mode === ERROR_SAVE && (
        <Error
        message="Error while saving"
        onClose={() => transition(CREATE, true)}
        />
        )}
        {mode === ERROR_DELETE && (
        <Error
        message="Error while deleting"
        onClose={() => transition(SHOW, true)}
        />
        )}
        
    </article>
  );
};