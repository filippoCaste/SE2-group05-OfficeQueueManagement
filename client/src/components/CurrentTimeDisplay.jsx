import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function CurrentTimeDisplay() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Function to update the current time every second
    const updateCurrentTime = () => {
      const now = dayjs();
      const formattedTime = now.format('YYYY-MM-DD HH:mm');
      setCurrentTime(formattedTime);
    };

    // Initially update the time and set up an interval to update it every second
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Current Time: {currentTime}</p>
    </div>
  );
}

export default CurrentTimeDisplay;
