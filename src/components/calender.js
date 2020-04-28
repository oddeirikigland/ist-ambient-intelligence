import React, { useEffect, useState } from "react";
import "./calender.css";

function Calender() {
  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const activities = [
    {
      title: "Odd Eirik Morning Run",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)
    },

    {
      title: "Lunch with neighbors",
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        12,
        0
      )
    },
    {
      title: "Family Dinner",
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        18,
        0
      )
    },
    {
      title: "Anna book circle",
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        17,
        0
      )
    },
    {
      title: "Odd Eirik tennis lesson",
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        20,
        0
      )
    },
    {
      title: "Ingeborg Surf lesson",
      date: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        21,
        0
      )
    }
  ];
  const three_scheduleactivities = activities
    .sort(() => Math.random() - Math.random())
    .slice(0, 3)
    .sort((a, b) => (a.date.getHours() > b.date.getHours() ? 1 : -1))

    .map(act => {
      return (
        <div
          className={
            Date.now() > act.date
              ? "schedule-activity-disable"
              : "schedule-activity"
          }
        >
          <p className="schedule-activity-text">
            {act.date.getHours()}:00-{act.date.getHours() + 1}:00
          </p>
          <p className="schedule-activity-text">{act.title}</p>
        </div>
      );
    });

  return (
    <div className="schedule">
      <h3 className="box-header">
        Today: {today.toDateString("en-US", options)}
      </h3>
      <div>{three_scheduleactivities}</div>
    </div>
  );
}

export default Calender;
