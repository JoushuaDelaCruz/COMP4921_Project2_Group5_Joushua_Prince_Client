import { useState, useEffect } from "react";

const useDateFormat = (timestamp) => {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    function calculateRelativeTime() {
      const currentDate = new Date();
      const pastDate = new Date(timestamp);
      const timeDifference = currentDate - pastDate;
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

      const minutesAgo = Math.floor(timeDifference / (1000 * 60));
      const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));

      if (minutesAgo < 1) {
        setRelativeTime("just now");
      } else if (minutesAgo === 1) {
        setRelativeTime("1 min ago");
      } else if (hoursAgo < 1) {
        setRelativeTime(rtf.format(-minutesAgo, "minute"));
      } else if (hoursAgo === 1) {
        setRelativeTime("1 hour ago");
      } else if (daysAgo < 1) {
        setRelativeTime(rtf.format(-hoursAgo, "hour"));
      } else if (daysAgo === 1) {
        setRelativeTime("1 day ago");
      } else if (monthsAgo < 1) {
        setRelativeTime(rtf.format(-daysAgo, "day"));
      } else if (monthsAgo === 1) {
        setRelativeTime("1 month ago");
      } else {
        setRelativeTime(pastDate.toDateString());
      }
    }

    calculateRelativeTime();

    // Update the relative time every minute
    const interval = setInterval(calculateRelativeTime, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return [relativeTime];
};

export default useDateFormat;
