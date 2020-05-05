import React from "react";
import Iframe from "react-iframe";

const Calender = (props) => {
  return (
    <div className="comp-container">
      <Iframe
        url="https://calendar.google.com/calendar/embed?height=200&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FOslo&amp;src=MWUxN3FyOG5xZDZhOXVqOWQ2MjAwMGw4Z3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23D50000&amp;mode=AGENDA&amp;showCalendars=0&amp;showTabs=0&amp;showPrint=0&amp;showDate=0&amp;showNav=0&amp;showTitle=0&amp;hl=en&amp;showTz=0"
        style={{border-width:0}}
        width="300px"
        height="200px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen
      />
    </div>
  );
};

export default Calender;
