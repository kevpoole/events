import Events from "./Events";
import { v4 as uuidv4 } from "uuid";

function EventContainer({ events, list, removeItem }) {
  return (
    <>
      {
        <div className="eventWrapper">
          {events}
          {list.map((item) => (
            <Events
              removeItem={removeItem}
              key={uuidv4()}
              id={item.id}
              date={item.date}
              title={item.title}
              venue={item.venue}
              time={item.time}
            />
          ))}
        </div>
      }
    </>
  );
}
export default EventContainer;
