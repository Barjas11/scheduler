import React from "react";
import "components/DayListItem.scss";
import "components/InterviewerList.scss";
const classNames = require("classnames");


export default function InterviewerListItem(props) {
  let InterviewerClass = classNames ({"interviewers__item":!props.selected},{"interviewers__item--selected": props.selected});
  return (
    <li className={InterviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};
