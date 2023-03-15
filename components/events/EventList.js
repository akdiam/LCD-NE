export default function EventList({ events }) {

  // Create display-ready rate for event card
  const calcDisplayDate = (event) => {
    const currYear = new Date().getFullYear().toString();
    const eventDate = event?.events?.date;
    return eventDate.includes(currYear) ? eventDate.slice(0, -6) : eventDate;
  }

  // Create display-ready time range for event card
  const calcDisplayTimeRange = (event) => {
    let startTime = event?.events?.startTime;
    let endTime = event?.events?.endTime;

    startTime = startTime.includes(':00') ? startTime.replace(':00 ', '') : startTime;
    endTime = endTime.includes(':00') ? endTime.replace(':00 ', '') : endTime;
    if (startTime.slice(-2) === endTime.slice(-2)) {
      startTime = startTime.slice(0, -2); 
    }
    
    return startTime + ' - ' + endTime;
  }

  // Sort events by date before rendering
  const eventsForSort = [...events];
  events = eventsForSort.sort((a, b) => {
    const dateA = new Date(a.events.date);
    const dateB = new Date(b.events.date);
    return dateA - dateB;
  });

  return (
    <div className="text-black mx-auto w-full py-2 lg:py-6">
      {events.map((event, _) => (
        <button className="my-2 px-4 lg:px-8 w-full" key={event.title}>
          <div className="shadow-xl border border-slate-700 rounded-md w-full bg-secondary hover:bg-secondaryHover transition duration-150 ease-in-out min-h-52 lg:h-72 text-left px-4 py-3 flex flex-col justify-around">
            <div className="text-xl lg:text-2xl text-white font-semibold tracking-wide pb-2">
              {event.title}
            </div>
            <div className="">
              <div className="text-lg lg:text-3xl font-semibold text-yellow-300 pb-2">
                {calcDisplayDate(event)}
              </div>
              <div className="text-sm lg:text-md font-thin text-white">
                {calcDisplayTimeRange(event)}
              </div>
              <div className="text-xs lg:text-sm font-thin text-white">
                {event?.events?.eventLocation}
              </div>
              <div className="text-xs lg:text-sm font-thin text-white">
                {event?.events?.eventType === 'Virtual' && event?.events?.eventType}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}