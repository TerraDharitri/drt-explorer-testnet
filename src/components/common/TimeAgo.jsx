import { useState, useEffect } from "react";
import { formatDistanceToNow, format } from "date-fns";

const TimeAgo = ({
  timestamp,
  format: dateFormat = "PPpp",
  showFull = false,
  className = "",
}) => {
  const [timeAgo, setTimeAgo] = useState("");
  const [fullDate, setFullDate] = useState("");

  useEffect(() => {
    if (!timestamp) return;

    // Convert timestamp to milliseconds if it's in seconds (Unix timestamp)
    const timestampMs = timestamp > 10000000000 ? timestamp : timestamp * 1000;
    const date = new Date(timestampMs);

    // Format the full date
    setFullDate(format(date, dateFormat));

    // Calculate the time ago
    const updateTimeAgo = () => {
      setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
    };

    updateTimeAgo();

    // Update the time ago every minute
    const intervalId = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(intervalId);
  }, [timestamp, dateFormat]);

  if (!timestamp) return null;

  return (
    <span className={className} title={showFull ? timeAgo : fullDate}>
      {showFull ? fullDate : timeAgo}
    </span>
  );
};

export default TimeAgo;
