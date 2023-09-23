// Create display-ready rate for event card
export const calcDisplayDate = (event) => {
  const currYear = new Date().getFullYear().toString();
  const eventDate = event?.events?.date;
  return eventDate.includes(currYear) ? eventDate.slice(0, -6) : eventDate;
}

// Create display-ready time range for event card
export const calcDisplayTimeRange = (event) => {
  let startTime = event?.events?.startTime;
  let endTime = event?.events?.endTime;

  startTime = startTime.includes(':00') ? startTime.replace(':00 ', '') : startTime;

  if (endTime) {
    endTime = endTime.includes(':00') ? endTime.replace(':00 ', '') : endTime;
  } else {
    endTime = '';
  }

  if (endTime !== '' && startTime.slice(-2) === endTime.slice(-2)) {
    startTime = startTime.slice(0, -2); 
  }

  return endTime !== ''
    ? startTime + ' - ' + endTime
    : startTime;
}