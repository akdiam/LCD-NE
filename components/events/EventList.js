import { calcDisplayDate, calcDisplayTimeRange } from "../../util/eventsUtil";
import YellowButton from "../common/YellowButton";

export default function EventList({ events }) {
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
        <div className="my-2 px-4 lg:px-8 w-full" key={event.title}>
          <div className="shadow-xl border border-slate-700 rounded-md w-full bg-secondary transition duration-150 ease-in-out min-h-52 text-left px-4 py-3 flex flex-col justify-around">
            <div className="text-xl lg:text-xl text-white font-semibold tracking-wide pb-2">
              {event.title}
            </div>
            <div className="">
              <div className="text-lg lg:text-xl font-semibold text-yellow-300 pb-2">
                {calcDisplayDate(event)}
              </div>
              <div className="text-sm lg:text-md font-md text-white">
                {calcDisplayTimeRange(event)}
              </div>
              <div className="text-xs lg:text-sm font-md text-gray-400">
                {event?.events?.eventLocation}
              </div>
              <div className="text-xs lg:text-sm font-thin text-gray-400">
                {event?.events?.eventType === 'Virtual' && event?.events?.eventType}
              </div>
              {event?.events?.callToActionLink && 
                <div className="mt-3 mb-1">
                  <YellowButton text={event?.events?.callToActionButtonText} href={event?.events?.callToActionLink} />
                </div>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}