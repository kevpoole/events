import { useState, useRef, useEffect } from "react";
import "./index.css";
import EventContainer from "./EventContainer";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
function App() {
  const [text, setText] = useState({
    date: "",
    venue: "",
    title: "",
    time: "",
    id: "",
  });
  const [list, setList] = useLocalStorage("events", []);
  const [dateHeading, setDateHeading] = useLocalStorage("headings", []);
  const [showForm, setShowForm] = useState(false);

  const textRef = useRef();

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const tomorrow = new Date(date.getTime());
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(date.getTime());
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const thirdDayFromNow = new Date(date.getTime());
  thirdDayFromNow.setDate(thirdDayFromNow.getDate() + 3);
  const fourthDayFromNow = new Date(date.getTime());
  fourthDayFromNow.setDate(fourthDayFromNow.getDate() + 4);
  const fifthDayFromNow = new Date(date.getTime());
  fifthDayFromNow.setDate(fifthDayFromNow.getDate() + 5);
  const sixthDayFromNow = new Date(date.getTime());
  sixthDayFromNow.setDate(sixthDayFromNow.getDate() + 6);

  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const months = {
    JANUARY: "00",
    FEBRUARY: "01",
    MARCH: "02",
    APRIL: "03",
    MAY: "04",
    JUNE: "05",
    JULY: "06",
    AUGUST: "07",
    SEPTEMBER: "08",
    OCTOBER: "09",
    NOVEMBER: "10",
    DECEMBER: "11",
  };

  dateHeading[dateHeading.indexOf("TODAY")] = date.toString();
  dateHeading[dateHeading.indexOf("TOMORROW")] = tomorrow.toString();
  dateHeading[dateHeading.indexOf(`${getDayOfWeek(2)}`)] =
    dayAfterTomorrow.toString();
  dateHeading[dateHeading.indexOf(`${getDayOfWeek(3)}`)] =
    thirdDayFromNow.toString();
  dateHeading[dateHeading.indexOf(`${getDayOfWeek(4)}`)] =
    fourthDayFromNow.toString();
  dateHeading[dateHeading.indexOf(`${getDayOfWeek(5)}`)] =
    fifthDayFromNow.toString();
  dateHeading[dateHeading.indexOf(`${getDayOfWeek(6)}`)] =
    sixthDayFromNow.toString();

  dateHeading.sort(function (a, b) {
    const date1 = new Date(a);
    const date2 = new Date(b);
    return date1 - date2;
  });
  const sorted = dateHeading.map((date) => date?.split(" 00")[0]);

  function getDayOfWeek(day) {
    const num = new Date().getDay() + day;
    return days[num];
  }

  function getMonthNumber(month) {
    return months[month];
  }

  function handleText(e) {
    const lines = e.target?.value?.split("\n");
    const dateName = lines[0].split(" AT ");
    const [month, day, year] = dateName[0]
      .replace(/,/g, "")
      .split(" ")
      .slice(1, 4);
    const dateName2 = new Date(+year, +getMonthNumber(month), +day);
    const dateString = (date) => {
      return date.toString().split(" 00")[0];
    };

    let upDate;
    let longDate;
    switch (dateName[0]) {
      case "TODAY":
        longDate = new Date(date);
        upDate = dateString(date);
        break;
      case "TOMORROW":
        longDate = new Date(tomorrow);
        upDate = dateString(tomorrow);
        break;
      case `${getDayOfWeek(2)}`:
        longDate = new Date(dayAfterTomorrow);
        upDate = dateString(dayAfterTomorrow);
        break;
      case `${getDayOfWeek(3)}`:
        longDate = new Date(thirdDayFromNow);
        upDate = dateString(thirdDayFromNow);
        break;
      case `${getDayOfWeek(4)}`:
        longDate = new Date(fourthDayFromNow);
        upDate = dateString(fourthDayFromNow);
        break;
      case `${getDayOfWeek(5)}`:
        longDate = new Date(fifthDayFromNow);
        upDate = dateString(fifthDayFromNow);
        break;
      case `${getDayOfWeek(6)}`:
        longDate = new Date(sixthDayFromNow);
        upDate = dateString(sixthDayFromNow);
        break;
      default:
        upDate = dateString(dateName2);
        longDate = dateName2;
    }
    setText({
      fullDate: longDate,
      date: dateName[0],
      title: lines[1],
      venue: lines[2],
      time: dateName[1],
      realDate: upDate,
      id: uuidv4(),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setList((prev) => [...prev, text]);
    setText({
      date: "",
      venue: "",
      title: "",
      time: "",
      id: "",
    });
    textRef.current.value = "";
  }

  const dateRef = useRef();
  const titleRef = useRef();
  const venueRef = useRef();
  const timeRef = useRef();

  function handleManualText(e) {
    const dateName = new Date(dateRef.current.value);
    dateName.setHours(0, 0, 0, 0);
    dateName.setDate(dateName.getDate() + 1);
    // console.log(dateName)
    setText({
      fullDate: dateName,
      date: dateRef.current.value,
      title: titleRef.current.value,
      venue: venueRef.current.value,
      time: timeRef.current.value,
      realDate: dateName.toString().split(" 00")[0],
      id: uuidv4(),
    });
  }

  function handleManualSubmit(e) {
    e.preventDefault();
    setList((prev) => [...prev, text]);
    setText({
      fullDate: "",
      realDate: "",
      date: "",
      venue: "",
      title: "",
      time: "",
      id: "",
    });
    dateRef.current.value = "";
    venueRef.current.value = "";
    titleRef.current.value = "";
    venueRef.current.value = "";
    timeRef.current.value = "";
  }

  const removeItem = (id) => {
    setList((prev) => {
      if (prev.find((item) => item.id === id))
        return prev.filter((item) => item.id !== id);
      else return;
    });
  };

  const removePastDates = () => {
    const newList = list.filter(
      (item) => new Date(item.fullDate) >= new Date(date)
    );
    setList(newList);
  };

  // sort alphabetically by venue
  function compare(a, b) {
    const venueA = a.venue?.toUpperCase();
    const venueB = b.venue?.toUpperCase();

    let comparison = 0;
    if (venueA > venueB) {
      comparison = 1;
    } else if (venueA < venueB) {
      comparison = -1;
    }
    return comparison;
  }

  list.sort(compare);

  useEffect(() => {
    setDateHeading(Array.from(new Set(list.map((item) => item.realDate))));
  }, [list]);

  return (
    <body>
      <form className="fbForm" action="" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="eventz">paste here</label>
          <textarea
            onChange={handleText}
            ref={textRef}
            name="eventz"
            placeholder="DATE & TIME (add [Format] here)
EVENT NAME
VENUE"
            id=""
            cols="80"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="submit">
          boom
        </button>
      </form>

      <div className="manualFormWrapper">
        <button className="submit" onClick={() => setShowForm(!showForm)}>
          manual entry
        </button>
        {showForm && (
          <form
            onSubmit={handleManualSubmit}
            onChange={handleManualText}
            className="manualForm"
            action=""
          >
            <div className="formContainer">
              <div className="inputContainer">
                <label htmlFor="date">date</label>
                <input
                  ref={dateRef}
                  className="input"
                  name="date"
                  type="date"
                  ng-model-options="{timezone: 'utc'}"
                />
              </div>

              <div className="inputContainer">
                <label htmlFor="venue">venue</label>
                <input
                  ref={venueRef}
                  name="venue"
                  className="input"
                  type="text"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="title">event title</label>
                <input
                  ref={titleRef}
                  name="title"
                  className="input"
                  type="text"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="time">time / format</label>
                <input
                  ref={timeRef}
                  name="time"
                  className="input"
                  type="text"
                />
              </div>
            </div>

            <button type="submit" className="submit">
              boom
            </button>
          </form>
        )}
      </div>

      <button className="submit" onClick={() => removePastDates()}>
        remove past dates
      </button>

      {sorted.map((events) => (
        <EventContainer
          key={uuidv4()}
          removeItem={removeItem}
          events={events}
          list={list.filter((item) => item.realDate === events)}
        />
      ))}
    </body>
  );
}

export default App;
