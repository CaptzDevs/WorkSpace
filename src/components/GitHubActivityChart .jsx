import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { format, subDays } from "date-fns";

const GitHubActivityChart = ({ data }) => {
  const today = new Date();
  
  return (
    <div className="p-4 shadow-md rounded-lg w-full h-full ">
      <CalendarHeatmap
        startDate={subDays(today, 365)}
        endDate={today}
        values={data}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value) => ({
          "data-tip": value.date ? `${value.count} contributions on ${value.date}` : "No contributions",
        })}
      />
      <style>
        {`
          .color-empty { fill: #ebedf0; }
          .color-scale-1 { opacity: 0; }
          .color-scale-1 { fill: #c6e48b; }
          .color-scale-2 { fill: #7bc96f; }
          .color-scale-3 { fill: #239a3b; }
          .color-scale-4 { fill: #196127; }
        `}
      </style>
    </div>
  );
};

export default GitHubActivityChart;
