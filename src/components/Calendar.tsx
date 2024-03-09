import { useRef, useState } from "react";
import { SevenColGrid, Wrapper, HeadDays, DateControls, } from "../style/Calendar.styled";
import { DAYS, MOCKAPPS } from "../data/data_time";
import {datesAreOnSameDay,getDarkColor,getDaysInMonth,getMonthYear,getSortedDays, nextMonth,prevMonth,} from "../utils/dateUtils";
import { Portal } from "./Portal";
import EventWrapper from "./EventWrapper";

interface Event {
    date: Date;
    title: string;
    color: string;
}

export default function Calender() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<Event[]>(MOCKAPPS);
    const dragDateRef = useRef<{ date: Date; target: string }>();
    const dragindexRef = useRef<{ index: number; target: string }>();
    const [showPortal, setShowPortal] = useState<boolean>(false);
    const [portalData, setPortalData] = useState<Event>({
        date: new Date(),
        title: "",
        color: "",
    });

    const addEvent = (date: Date, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(event.target as HTMLDivElement).classList.contains("StyledEvent")) {
            const text = window.prompt("name");
            if (text) {
                date.setHours(0, 0, 0, 0);
                setEvents((prev) => [
                    ...prev,
                    {date, title: text, color: getDarkColor()},
                ]);
            }
        }
    };

    const drag = (index: number, e: React.DragEvent<HTMLDivElement>) => {
        dragindexRef.current = {index, target: e.currentTarget.id};
    };

    const onDragEnter = (date: Date, e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const targetId = (e.target as HTMLDivElement)?.id || "";
        dragDateRef.current = {date, target: targetId};
    };

    const drop = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (dragDateRef.current && dragindexRef.current !== undefined && dragDateRef.current.date) {
            setEvents((prev) =>
                prev.map((event) => {
                    if (dragindexRef.current!.target.includes(event.color)) {
                        return {...event, date: dragDateRef.current!.date};
                    }
                    return event;
                })
            );
        }
    };

    const handleOnClickEvent = (event: Event) => {
        setShowPortal(true);
        setPortalData(event);
    };

    const handlePotalClose = () => setShowPortal(false);

    const handleDelete = () => {
        setEvents((prevEvents) =>
            prevEvents.filter((ev) => ev.title !== portalData.title)
        );
        handlePotalClose();
    };

    return (
        <Wrapper>
            <DateControls>
                <button onClick={() => prevMonth(currentDate, setCurrentDate)} name="arrow-back-circle-outline">
                    {"<"}
                </button>
                {getMonthYear(currentDate)}
                <button onClick={() => nextMonth(currentDate, setCurrentDate)} name="arrow-forward-circle-outline">
                    {">"}
                </button>
            </DateControls>
            <SevenColGrid>
                {DAYS.map((day) => (
                    <HeadDays key={day} className="nonDRAG">
                        {day}
                    </HeadDays>
                ))}
            </SevenColGrid>

            <SevenColGrid fullheight="true" is28Days={getDaysInMonth(currentDate) === 28}>

                {getSortedDays(currentDate).map((day) => {
                    return (
                        <div key={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
                             id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
                             onDragEnter={(e) =>
                                onDragEnter(new Date(currentDate.getFullYear(),currentDate.getMonth(),day),e)
                             }
                             onDragOver={(e) => e.preventDefault()}
                             onDragEnd={drop}
                             onClick={(e) =>
                                 addEvent(new Date( currentDate.getFullYear(),currentDate.getMonth(),day),e)
                             }
                        >
            <span className={`nonDRAG ${
                datesAreOnSameDay(
                    new Date(), new Date(currentDate.getFullYear(),currentDate.getMonth(),day)
                )? "active": ""
            }`}
            >
              {day}
            </span>
            <EventWrapper
             events={events}
             currentDate={currentDate}
             day={day}
             onDrag={drag}
             onClickEvent={handleOnClickEvent}
             />
            </div>
            )
         })}
            </SevenColGrid>
            {showPortal && (
                <Portal
                    title={portalData.title}
                    date={portalData.date}
                    handleDelete={handleDelete}
                    handlePotalClose={handlePotalClose}
                />
            )}
        </Wrapper>
    );
}

