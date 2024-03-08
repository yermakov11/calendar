import { datesAreOnSameDay } from "../utils/dateUtils";
import { SeeMore } from "../style/Calendar.styled";

interface Event {
  date: Date;
  title: string;
  color: string;
}

interface EventWrapperProps {
  events: Event[];
  currentDate: Date;
  day: number;
  onDrag: (index: number, e: React.DragEvent<HTMLDivElement>) => void;
  onClickEvent: (event: Event) => void;
}

const filterEventsByDay = (
  events: Event[],
  currentDate: Date,
  day: number
): Event[] => {
  return events.filter((ev) =>
    datesAreOnSameDay(
      ev.date,
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    )
  );
};

const EventWrapper = ({events,currentDate,day,onDrag,onClickEvent,}:EventWrapperProps) => {
  const filteredEvents = filterEventsByDay(events, currentDate, day);
  return (
    <>
      {filteredEvents.map((ev, index) => (
        <div
          key={ev.title}
          onDragStart={(e) => onDrag(index, e)}
          onClick={() => onClickEvent(ev)}
          draggable
          className="StyledEvent"
          id={`${ev.color} ${ev.title}`}
          style={{ backgroundColor: ev.color }}
        >
          {ev.title}
        </div>
      ))}

      {filteredEvents.length > 2 && (
        <SeeMore
          onClick={(e) => {
            e.stopPropagation();
            console.log("clicked p");
          }}
        >
          see more...
        </SeeMore>
      )}
    </>
  );
};

export default EventWrapper;
